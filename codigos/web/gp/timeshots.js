// timeshots.js
// Módulo inicial para TimeShots
// 07/07/2025
// (Por ahora es copia del inline, luego modularizamos más)

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
  tasks = {};
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
    <div class="flex-grow-1 me-3"><strong>${id}</strong>
      <span class="status-indicator" id="status-${id}">
        ${fin ? `✔️ Finalizada (${minTranscurridos(inicio, fin)} min)` : ""}
      </span>
    </div>
    <button class="btn btn-success btn-icon me-2" title="Start"><span>&#9658;</span></button>
    <button class="btn btn-warning btn-icon me-2" title="Pause"><span>&#10073;&#10073;</span></button>
    <button class="btn btn-danger btn-icon me-2" title="End"><span>&#9632;</span></button>
    <button class="btn btn-outline-secondary btn-icon" title="Remove"><span>&#10006;</span></button>
  `;

  const [playBtn, pauseBtn, endBtn, removeBtn] = row.querySelectorAll("button");
  const statusSpan = row.querySelector(`#status-${id}`);

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
    statusSpan.textContent = "🕒";
  };

  pauseBtn.onclick = () => {
    statusSpan.textContent = "⏸";
    // No hacemos nada más por ahora, pero podrías pausar un cronómetro real
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
}

// Helper para minutos transcurridos
function minTranscurridos(inicio, fin) {
  return Math.round((fin - inicio) / 60000);
}

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


