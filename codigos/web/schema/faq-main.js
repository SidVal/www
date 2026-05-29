document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('faqForm');
  const container = document.getElementById('faqContainer');
  const addBtn = document.getElementById('addFaqBtn');
  
  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  // Función para re-indexar los títulos visuales de las preguntas
  const updateIndexes = () => {
    const items = container.querySelectorAll('.faq-item');
    items.forEach((item, index) => {
      const titleSpan = item.querySelector('span');
      titleSpan.textContent = `Pregunta ${index + 1}`;
      
      // Mostrar botón de eliminar a partir de la segunda pregunta
      const removeBtn = item.querySelector('.remove-faq');
      if (index === 0) {
        removeBtn.classList.add('hidden');
      } else {
        removeBtn.classList.remove('hidden');
      }
    });
  };

  // Evento para añadir un nuevo bloque de pregunta/respuesta
  addBtn.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.className = 'faq-item p-4 bg-slate-50 rounded-lg border border-slate-200 relative space-y-3';
    
    newItem.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider"></span>
        <button type="button" class="remove-faq text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">Eliminar</button>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Pregunta (name)</label>
        <input type="text" required placeholder="Ingresa la pregunta..." 
               class="faq-question w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Respuesta (acceptedAnswer)</label>
        <textarea required rows="2" placeholder="Ingresa la respuesta..." 
                  class="faq-answer w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"></textarea>
      </div>
    `;

    // Asignar evento de borrado al botón del nuevo bloque
    newItem.querySelector('.remove-faq').addEventListener('click', () => {
      newItem.remove();
      updateIndexes();
    });

    container.appendChild(newItem);
    updateIndexes();
  });

  // Asignar evento de borrado a los elementos existentes iniciales por si acaso
  container.querySelectorAll('.remove-faq').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.closest('.faq-item').remove();
      updateIndexes();
    });
  });

  // Procesar y compilar el Schema final
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const questions = container.querySelectorAll('.faq-question');
    const answers = container.querySelectorAll('.faq-answer');
    
    const mainEntity = [];

    // Iterar dinámicamente sobre todos los bloques generados
    questions.forEach((input, index) => {
      const qText = input.value.trim();
      const aText = answers[index].value.trim();

      mainEntity.push({
        "@type": "Question",
        "name": qText,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": aText
        }
      });
    });

    // Crear la estructura raíz de FAQPage
    const faqJson = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": mainEntity
    };

    // Inyectar en la interfaz
    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(faqJson, null, 2)}\n<\/script>`;
    
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
      alert('Error al copiar el texto automáticamente.');
    }
  });

  // Cerrar el modal
  const closeModal = () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
