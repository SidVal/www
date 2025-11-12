// timeshots.js
// Módulo inicial para TimeShots ini: 07/07/2025
// 

// --- Helpers para LocalStorage ---
const LS_KEY = "timeshots_tareas";

// Leer tareas desde LocalStorage
function getTareasFromLS() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

// Guardar tareas al LocalStorage
function saveTareasToLS(arr) {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

// Añadir tarea nueva
function addTareaToLS(obj) {
  const arr = getTareasFromLS();
  arr.push(obj);
  saveTareasToLS(arr);
}

// Borrar tarea por id
function removeTareaFromLS(id) {
  let arr = getTareasFromLS();
  arr = arr.filter(t => t.id !== id);
  saveTareasToLS(arr);
}

// Actualizar tarea (por id)
function updateTareaInLS(obj) {
  let arr = getTareasFromLS();
  arr = arr.map(t => t.id === obj.id ? obj : t);
  saveTareasToLS(arr);
}

// Limpiar todo
function clearTareasLS() {
  localStorage.removeItem(LS_KEY);
}

// --- UI y lógica principal ---
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const tasks = {}; // Para control temporal (no es el storage principal)

// Renderiza todas las tareas de LocalStorage
function renderAllTareas() {
  taskList.innerHTML = "";
  Object.keys(tasks).forEach(k => delete tasks[k]); // Limpia tareas en memoria temporal
  const tareas = getTareasFromLS();
  tareas.forEach(renderTareaRow);
}


// Crea la fila de tarea y la agrega al DOM y memoria temporal
function renderTareaRow(tarea) {
  const { id, inicio, fin } = tarea;
  if (tasks[id]) return; // Ya está en pantalla

  const row = document.createElement("div");
  row.className = "d-flex align-items-center task-row";
  row.innerHTML = `
    <input type="checkbox" class="form-check-input me-2 complete-check" title="Marcar como completada" ${fin ? "checked" : ""} ${fin ? "disabled" : ""}/>
    <div class="flex-grow-1 me-3 tarea-txt">
      <strong>${id}</strong>
      <span class="status-indicator" id="status-${id}">
        ${fin ? `✔️ Finalizada (${minTranscurridos(inicio, fin)} min)` : ""}
      </span>
    </div>
    <button class="btn btn-success btn-icon me-2" title="Start"><span>&#9658;</span></button>
    <button class="btn btn-warning btn-icon me-2" title="Pause"><span>&#10073;&#10073;</span></button>
    <button class="btn btn-danger btn-icon me-2" title="End"><span>&#9632;</span></button>
    <button class="btn btn-outline-secondary btn-icon" title="Remove"><span>&#10006;</span></button>
  `;

  const completeCheck = row.querySelector('.complete-check');
  const tareaTxt = row.querySelector('.tarea-txt');

  // Al iniciar, si está finalizada: tachar
  if (fin) tareaTxt.style.textDecoration = "line-through";

  // Evento para marcar como completada
completeCheck.addEventListener('change', function() {
  if (this.checked && !tarea.fin) {
    if (!tarea.inicio) {
      alert("No podés marcarla como completada si nunca se inició.");
      this.checked = false;
      return;
    }

    // Marcar fin y guardar
    const now = Date.now();
    tarea.fin = now;
    updateTareaInLS(tarea);
    statusSpan.textContent = `✔️ Finalizada (${minTranscurridos(tarea.inicio, now)} min)`;
    tareaTxt.style.textDecoration = "line-through";

    // Deshabilitar controles de tiempo
    playBtn.disabled = true;
    pauseBtn.disabled = true;
    endBtn.disabled = true;
    completeCheck.disabled = true;
  }
});


  const [playBtn, pauseBtn, endBtn, removeBtn] = row.querySelectorAll("button");
  const statusSpan = row.querySelector(`#status-${id}`);

// desabilito botones excepto el start
  pauseBtn.disabled = true;
  endBtn.disabled = true;

// los botones de tareas finalizadas sigan desactivados
    if (fin) {
    playBtn.disabled = true;
    pauseBtn.disabled = true;
    endBtn.disabled = true;
    completeCheck.disabled = true;
  }


  let timer = null;
  let startTime = inicio ? inicio : null;
  let endTime = fin ? fin : null;

playBtn.onclick = () => {
  if (endTime) return;
  if (!startTime) {
    startTime = Date.now();
    tarea.inicio = startTime;
    updateTareaInLS(tarea);
  }
  statusSpan.textContent = "🕒 En curso";
  playBtn.disabled = true;
  pauseBtn.disabled = false;
  endBtn.disabled = false;
};

pauseBtn.onclick = () => {
  statusSpan.textContent = "⏸ Pausada";
  playBtn.disabled = false;
  pauseBtn.disabled = true;
};


  endBtn.onclick = () => {
    if (!endTime) {
      endTime = Date.now();
      tarea.fin = endTime;
      updateTareaInLS(tarea);
      const minutos = minTranscurridos(startTime, endTime);
      statusSpan.textContent = `✔️ Finalizada (${minutos} min)`;
      alert(`Tarea "${id}" finalizada. Tiempo total: ${minutos} minutos.`);
    }
  };

  removeBtn.onclick = () => {
    // Chequeo de header/checkbox antes de borrar se agregará después
    row.remove();
    removeTareaFromLS(id);
    delete tasks[id];
  };

  taskList.appendChild(row);
  tasks[id] = { row, startTime, endTime, statusSpan };

  // ...dentro de renderTareaRow...

  removeBtn.onclick = () => {
  // Nuevo: chequeo del checkbox antes de borrar
    const canDelete = document.getElementById("enableDelete")?.checked;
    if (!canDelete) {
      alert("Debes habilitar el borrado en el header para eliminar tareas.");
      return;
    }
    row.remove();
    removeTareaFromLS(id);
    delete tasks[id];
};

}

// Helper para minutos transcurridos
function minTranscurridos(inicio, fin) {
  // Si falta alguno de los dos, devolvemos 0 o texto vacío
  if (!inicio || !fin || isNaN(inicio) || isNaN(fin)) {
    return 0;
  }

  const diff = fin - inicio;

  // Si el tiempo es negativo o absurdo, evitamos mostrarlo
  if (diff < 0) return 0;

  return Math.round(diff / 60000);
};


// Añadir tarea nueva desde el input
taskInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && taskInput.value.trim()) {
    const id = taskInput.value.trim();
    if (tasks[id]) return; // no repetir en UI
    const tarea = { id, descripcion: "", inicio: null, fin: null };
    addTareaToLS(tarea);
    renderTareaRow(tarea);
    taskInput.value = "";
  }
});

// Botón para cargar tareas de LocalStorage
// (Agréga este botón en el HTML: <span class="badge bg-info badge-action me-2" id="loadTasks">+CargarTareas</span>)
document.getElementById("loadTasks")?.addEventListener("click", renderAllTareas);

// Cierre del día: finaliza todas
document.getElementById("endDay").addEventListener("click", () => {
  const tareas = getTareasFromLS();
  const now = Date.now();
  tareas.forEach(t => {
    if (!t.fin && t.inicio) {
      t.fin = now;
      updateTareaInLS(t);
    }
  });
  renderAllTareas();
});

// Liberar memoria
document.getElementById("clearMemory").addEventListener("click", () => {
  clearTareasLS();
  renderAllTareas();
});

// Al cargar la página, mostrar tareas actuales
window.addEventListener("DOMContentLoaded", renderAllTareas);


