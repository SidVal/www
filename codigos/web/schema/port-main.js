document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('portfolioForm');
  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Capturar datos del formulario
    const name = document.getElementById('projName').value.trim();
    const url = document.getElementById('projUrl').value.trim();
    const image = document.getElementById('projImage').value.trim();
    const description = document.getElementById('projDescription').value.trim();
    const creatorName = document.getElementById('creatorName').value.trim();
    const clientName = document.getElementById('clientName').value.trim();
    
    // Procesar las palabras clave/tecnologías
    const keywordsRaw = document.getElementById('projKeywords').value;
    const keywords = keywordsRaw ? keywordsRaw.split(',').map(k => k.trim()).filter(Boolean).join(', ') : '';

    // Armar el objeto estructurado JSON-LD
    let portfolioJson = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": name,
      "description": description,
      "image": image,
      "url": url,
      "creator": {
        "@type": "Person",
        "name": creatorName
      }
    };

    // Agregar tecnologías de manera explícita si existen
    if (keywords) {
      portfolioJson.keywords = keywords;
    }

    // Agregar la relación con la empresa cliente si se especificó
    if (clientName) {
      portfolioJson.provider = {
        "@type": "Organization",
        "name": clientName
      };
    }

    // Volcar datos formateados al textarea del modal
    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(portfolioJson, null, 2)}\n<\/script>`;

    // Mostrar interfaz emergente
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  // Copiado interactivo al portapapeles
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
      alert('Error al intentar copiar. Hazlo seleccionando el recuadro negro manualmente.');
    }
  });

  // Controladores de cierre del modal
  const closeModal = () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
