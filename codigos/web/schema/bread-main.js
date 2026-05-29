document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('breadcrumbForm');
  const container = document.getElementById('crumbsContainer');
  const addCrumbBtn = document.getElementById('addCrumbBtn');
  
  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  // Actualizar los números de los niveles visuales de las migajas
  const updateCrumbIndexes = () => {
    const items = container.querySelectorAll('.crumb-item');
    items.forEach((item, index) => {
      const titleSpan = item.querySelector('.crumb-index');
      titleSpan.textContent = `Nivel ${index + 2}`; // El nivel 1 siempre es la Home fija
      
      const removeBtn = item.querySelector('.remove-crumb');
      if (index === 0 && items.length === 1) {
        removeBtn.classList.add('hidden'); // Ocultar si es el único nivel extra
      } else {
        removeBtn.classList.remove('hidden');
      }
    });
  };

  // Añadir un nuevo nivel de navegación recursivo
  addCrumbBtn.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.className = 'crumb-item p-4 bg-slate-50 rounded-lg border border-slate-200 relative space-y-3';
    
    newItem.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="crumb-index text-xs font-bold text-slate-400 uppercase tracking-wider"></span>
        <button type="button" class="remove-crumb text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">Eliminar</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Nombre Visual (item.name)</label>
          <input type="text" required placeholder="Ej. Consultoría Avanzada" 
                 class="crumb-name w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">URL Completa (item.@id)</label>
          <input type="url" required placeholder="https://tusitio.com" 
                 class="crumb-url w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
      </div>
    `;

    newItem.querySelector('.remove-crumb').addEventListener('click', () => {
      newItem.remove();
      updateCrumbIndexes();
    });

    container.appendChild(newItem);
    updateCrumbIndexes();
  });

  // Procesar formulario y armar el arreglo jerárquico
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rootName = document.getElementById('rootName').value.trim();
    const rootUrl = document.getElementById('rootUrl').value.trim();

    const crumbNames = container.querySelectorAll('.crumb-name');
    const crumbUrls = container.querySelectorAll('.crumb-url');

    // Inicializar la lista con la Home (Posición 1)
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": rootName,
        "item": rootUrl
      }
    ];

    // Iterar dinámicamente sobre los niveles extras agregados
    crumbNames.forEach((input, index) => {
      const name = input.value.trim();
      const url = crumbUrls[index].value.trim();

      itemListElement.push({
        "@type": "ListItem",
        "position": index + 2, // Desplaza la posición según el índice
        "name": name,
        "item": url
      });
    });

    // Crear la estructura de marcado BreadcrumbList
    const breadcrumbJson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };

    // Inyectar en la interfaz
    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(breadcrumbJson, null, 2)}\n<\/script>`;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  // Copiar código al portapapeles
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(schemaTextArea.value);
      const originalText = copyBtn.innerText;
      copyBtn.innerText = '¡Copiado con éxito! ✓';
      copyBtn.classList.replace('bg-blue-600', 'bg-green-600');
      
      setTimeout(() => {
        copyBtn.innerText = originalText;
        copyBtn.classList.replace('bg-green-600', 'bg-blue-600');
      }, 2000);
    } catch (err) {
      alert('Error al copiar automáticamente.');
    }
  });

  const closeModal = () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
