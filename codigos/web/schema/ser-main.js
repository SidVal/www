document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('serviceForm');
  const featuresContainer = document.getElementById('featuresContainer');
  const addFeatureBtn = document.getElementById('addFeatureBtn');
  
  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  // Lógica para añadir dinámicamente campos de características
  addFeatureBtn.addEventListener('click', () => {
    const div = document.createElement('div');
    div.className = 'flex gap-2';
    div.innerHTML = `
      <input type="text" required placeholder="Ingresa otra característica..." 
             class="ser-feature w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
      <button type="button" class="remove-feature text-red-500 hover:text-red-700 font-bold px-2 cursor-pointer">&times;</button>
    `;

    // Evento para remover la línea creada
    div.querySelector('.remove-feature').addEventListener('click', () => {
      div.remove();
    });

    featuresContainer.appendChild(div);
  });

  // Procesar el envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Valores básicos
    const name = document.getElementById('serName').value.trim();
    const description = document.getElementById('serDescription').value.trim();
    const price = document.getElementById('serPrice').value;
    const currency = document.getElementById('serCurrency').value;
    const provider = document.getElementById('serProvider').value.trim();

    // Mapear todas las características cargadas en el formulario
    const featureInputs = featuresContainer.querySelectorAll('.ser-feature');
    const featuresList = Array.from(featureInputs).map(input => input.value.trim()).filter(Boolean);

    // Construcción del Schema estructurado Service + Offer
    let serviceJson = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": name,
      "description": description,
      "provider": {
        "@type": "Person", // Puede cambiarse por Organization si fuera una agencia
        "name": provider
      },
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": currency,
        "availability": "https://schema.org" // Indica que el servicio está disponible para contratación
      }
    };

    // Añadir entregables específicos si se completaron en el formulario
    if (featuresList.length > 0) {
      serviceJson.serviceOutput = featuresList; // Define los resultados tangibles del servicio
    }

    // Volcar resultado formateado al modal
    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(serviceJson, null, 2)}\n<\/script>`;

    // Mostrar el popup
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
      alert('Ocurrió un error al copiar el código de manera automática.');
    }
  });

  // Cerrar modal de visualización
  const closeModal = () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
