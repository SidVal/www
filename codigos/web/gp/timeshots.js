// TimeShots V2
// Módulo inicial para TimeShots ini: 07/07/2025
// Control diario de tiempo por tarea
// Ultima actualización: 01/10/2026

const STORAGE_KEY = "timeshots_state_v2";
const LEGACY_KEY = "timeshots_tareas";

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const dayInfo = document.getElementById("dayInfo");
const daySummary = document.getElementById("daySummary");

let state = loadState();


// =====================================================
// FECHAS
// =====================================================

function getToday() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


// =====================================================
// STORAGE
// =====================================================

function createEmptyState() {
  return {
    version: 2,
    fecha: getToday(),
    cerrada: false,
    closedAt: null,
    tareas: []
  };
}


function loadState() {

  try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {

      const data = JSON.parse(saved);

      // Si la jornada anterior estaba cerrada y ya cambió el día,
      // comenzamos automáticamente una jornada nueva.

      if (data.fecha !== getToday() && data.cerrada) {
        return createEmptyState();
      }

      return data;
    }

  } catch (error) {

    console.error("Error leyendo TimeShots:", error);

  }

  return migrateLegacyData();
}


function saveState() {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );

  } catch (error) {

    console.error("Error guardando TimeShots:", error);

    alert(
      "No se pudo guardar la información en LocalStorage."
    );

  }

}


// =====================================================
// MIGRACIÓN V1
// =====================================================

function migrateLegacyData() {

  try {

    const legacy = JSON.parse(
      localStorage.getItem(LEGACY_KEY)
    );

    if (!Array.isArray(legacy) || legacy.length === 0) {
      return createEmptyState();
    }


    const migrated = createEmptyState();


    migrated.tareas = legacy.map(old => {

      let accumulatedMs = 0;
      let estado = "pending";
      let completedAt = null;


      if (old.inicio && old.fin) {

        accumulatedMs =
          Math.max(0, old.fin - old.inicio);

        estado = "completed";
        completedAt = old.fin;

      } else if (old.inicio) {

        // No podemos reconstruir correctamente las pausas
        // del sistema anterior.
        //
        // Conservamos el tiempo que V1 habría calculado.

        accumulatedMs =
          Math.max(0, Date.now() - old.inicio);

        estado = "paused";
      }


      return {

        id: old.id,

        descripcion:
          old.descripcion || "",

        estado,

        createdAt:
          old.inicio || Date.now(),

        runningSince: null,

        accumulatedMs,

        completedAt
      };

    });


    saveMigratedState(migrated);

    return migrated;


  } catch (error) {

    console.error(
      "Error migrando TimeShots V1:",
      error
    );

    return createEmptyState();

  }

}


function saveMigratedState(data) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );

}


// =====================================================
// TIEMPO
// =====================================================

function getTaskTime(task) {

  let total = task.accumulatedMs || 0;

  if (
    task.estado === "running" &&
    task.runningSince
  ) {

    total +=
      Date.now() - task.runningSince;

  }

  return total;

}


function formatTime(ms) {

  const totalMinutes =
    Math.floor(ms / 60000);

  const hours =
    Math.floor(totalMinutes / 60);

  const minutes =
    totalMinutes % 60;


  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${minutes} min`;

}


// =====================================================
// PAUSAR
// =====================================================

function pauseTask(task) {

  if (task.estado !== "running") {
    return;
  }


  if (task.runningSince) {

    task.accumulatedMs +=
      Date.now() - task.runningSince;

  }


  task.runningSince = null;

  task.estado = "paused";
}


// =====================================================
// MULTITASKING CONTROLADO
// =====================================================

function pauseOtherTasks(currentTask) {

  state.tareas.forEach(task => {

    if (
      task !== currentTask &&
      task.estado === "running"
    ) {

      pauseTask(task);

    }

  });

}


// =====================================================
// INICIAR / REANUDAR
// =====================================================

function startTask(task) {

  if (
    task.estado === "completed" ||
    state.cerrada
  ) {
    return;
  }


  // Regla central de TimeShots:
  // solo una tarea puede correr simultáneamente.

  pauseOtherTasks(task);


  task.estado = "running";

  task.runningSince = Date.now();


  saveState();

  renderAll();
}


// =====================================================
// FINALIZAR
// =====================================================

function completeTask(task) {

  if (task.estado === "completed") {
    return;
  }


  if (task.estado === "running") {

    pauseTask(task);

  }


  task.estado = "completed";

  task.completedAt = Date.now();

  task.runningSince = null;


  saveState();

  renderAll();
}


// =====================================================
// BORRAR
// =====================================================

function removeTask(task) {

  const enabled =
    document.getElementById("enableDelete").checked;


  if (!enabled) {
    return;
  }


  state.tareas =
    state.tareas.filter(t => t !== task);


  saveState();

  renderAll();
}


// =====================================================
// CREAR TAREA
// =====================================================

function addTask(id) {

  const cleanId = id.trim();


  if (!cleanId) {
    return;
  }


  const exists =
    state.tareas.some(
      task => task.id === cleanId
    );


  if (exists) {

    alert(
      "Esa tarea ya existe."
    );

    return;
  }


  const task = {

    id: cleanId,

    descripcion: "",

    estado: "pending",

    createdAt: Date.now(),

    runningSince: null,

    accumulatedMs: 0,

    completedAt: null
  };


  state.tareas.push(task);

  saveState();

  renderAll();
}


// =====================================================
// RENDER
// =====================================================

function renderAll() {

  taskList.replaceChildren();

  renderDayInfo();


  state.tareas.forEach(task => {

    taskList.appendChild(
      createTaskRow(task)
    );

  });


  renderSummary();
}


// =====================================================
// FILA DE TAREA
// =====================================================

function createTaskRow(task) {

  const row =
    document.createElement("div");


  row.className =
    "d-flex align-items-center task-row";


  if (task.estado === "completed") {
    row.classList.add("task-completed");
  }


  if (task.estado === "running") {
    row.classList.add("task-running");
  }


  // Checkbox

  const checkbox =
    document.createElement("input");

  checkbox.type = "checkbox";

  checkbox.className =
    "form-check-input me-2";

  checkbox.checked =
    task.estado === "completed";

  checkbox.disabled =
    task.estado === "completed" ||
    state.cerrada;


  checkbox.title =
    "Marcar como completada";


  checkbox.addEventListener(
    "change",
    () => {

      if (checkbox.checked) {

        completeTask(task);

      }

    }
  );


  // Texto

  const textContainer =
    document.createElement("div");

  textContainer.className =
    "flex-grow-1 me-3";


  const name =
    document.createElement("strong");

  name.className = "task-name";

  name.textContent =
    task.descripcion || task.id;


  const status =
    document.createElement("span");

  status.className =
    "status-indicator";


  status.textContent =
    getStatusText(task);


  textContainer.appendChild(name);
  textContainer.appendChild(status);


  // Botones

  const playBtn =
    createButton(
      "▶",
      "btn-success",
      "Iniciar / reanudar"
    );


  const pauseBtn =
    createButton(
      "Ⅱ",
      "btn-warning",
      "Pausar"
    );


  const endBtn =
    createButton(
      "■",
      "btn-danger",
      "Finalizar"
    );


  const removeBtn =
    createButton(
      "×",
      "btn-outline-secondary",
      "Eliminar"
    );


  // Estado botones

  playBtn.disabled =
    task.estado === "running" ||
    task.estado === "completed" ||
    state.cerrada;


  pauseBtn.disabled =
    task.estado !== "running" ||
    state.cerrada;


  endBtn.disabled =
    task.estado === "completed" ||
    state.cerrada;


  const deleteEnabled =
    document.getElementById(
      "enableDelete"
    ).checked;


  removeBtn.disabled =
    !deleteEnabled;


  // Eventos

  playBtn.addEventListener(
    "click",
    () => startTask(task)
  );


  pauseBtn.addEventListener(
    "click",
    () => {

      pauseTask(task);

      saveState();

      renderAll();

    }
  );


  endBtn.addEventListener(
    "click",
    () => completeTask(task)
  );


  removeBtn.addEventListener(
    "click",
    () => removeTask(task)
  );


  row.appendChild(checkbox);
  row.appendChild(textContainer);

  row.appendChild(playBtn);
  row.appendChild(pauseBtn);
  row.appendChild(endBtn);
  row.appendChild(removeBtn);


  return row;
}


// =====================================================
// BOTÓN
// =====================================================

function createButton(
  text,
  bootstrapClass,
  title
) {

  const button =
    document.createElement("button");


  button.type = "button";

  button.className =
    `btn ${bootstrapClass} btn-icon me-2`;

  button.title = title;

  button.textContent = text;


  return button;

}


// =====================================================
// STATUS
// =====================================================

function getStatusText(task) {

  const time =
    formatTime(getTaskTime(task));


  switch (task.estado) {

    case "running":
      return ` · 🕒 En curso · ${time}`;

    case "paused":
      return ` · ⏸ Pausada · ${time}`;

    case "completed":
      return ` · ✔ Finalizada · ${time}`;

    default:
      return " · Pendiente";

  }

}


// =====================================================
// CABECERA DEL DÍA
// =====================================================

function renderDayInfo() {

  if (state.cerrada) {

    dayInfo.textContent =
      `Jornada ${state.fecha} · Cerrada`;

  } else {

    dayInfo.textContent =
      `Jornada ${state.fecha}`;

  }

}


// =====================================================
// RESUMEN
// =====================================================

function renderSummary() {

  daySummary.replaceChildren();


  if (!state.cerrada) {
    return;
  }


  const hr =
    document.createElement("hr");


  const title =
    document.createElement("h5");

  title.textContent =
    `Resumen del día ${state.fecha}`;


  daySummary.appendChild(hr);
  daySummary.appendChild(title);


  let totalMs = 0;


  state.tareas.forEach(task => {

    const time =
      getTaskTime(task);

    totalMs += time;


    const row =
      document.createElement("div");


    const name =
      task.descripcion || task.id;


    row.textContent =
      `${name}: ${formatTime(time)}`;


    daySummary.appendChild(row);

  });


  const total =
    document.createElement("strong");


  total.className =
    "d-block mt-3";


  total.textContent =
    `TOTAL: ${formatTime(totalMs)}`;


  daySummary.appendChild(total);

}


// =====================================================
// CIERRE DEL DÍA
// =====================================================

function closeDay() {

  if (state.cerrada) {

    alert(
      "La jornada ya está cerrada."
    );

    return;

  }


  const confirmClose =
    confirm(
      "¿Cerrar la jornada de hoy?\n\n" +
      "Las tareas activas serán finalizadas."
    );


  if (!confirmClose) {
    return;
  }


  const now = Date.now();


  state.tareas.forEach(task => {

    if (task.estado === "running") {

      pauseTask(task);

    }


    if (
      task.estado === "paused" ||
      task.estado === "running"
    ) {

      task.estado = "completed";

      task.completedAt = now;

    }

  });


  state.cerrada = true;

  state.closedAt = now;


  saveState();

  renderAll();
}


// =====================================================
// EVENTOS
// =====================================================

taskInput.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Enter") {
      return;
    }


    addTask(taskInput.value);

    taskInput.value = "";

  }
);


document
  .getElementById("loadTasks")
  .addEventListener(
    "click",
    renderAll
  );


document
  .getElementById("endDay")
  .addEventListener(
    "click",
    closeDay
  );


document
  .getElementById("enableDelete")
  .addEventListener(
    "change",
    renderAll
  );


// =====================================================
// ACTUALIZAR TIEMPOS VISUALES
// =====================================================

// No necesitamos escribir en LocalStorage cada segundo.
// Solamente refrescamos la pantalla.

setInterval(() => {

  const running =
    state.tareas.some(
      task =>
        task.estado === "running"
    );


  if (running) {
    renderAll();
  }

}, 30000);


// =====================================================
// INICIO
// =====================================================

renderAll();
