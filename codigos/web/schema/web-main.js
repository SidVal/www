document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('websiteForm');
  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('webName').value.trim();
    const url = document.getElementById('webUrl').value.trim();
    const searchUrl = document.getElementById('webSearchUrl').value.trim();

    // Construcción del objeto JSON-LD WebSite con SearchAction integrado
    const websiteJson = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": name,
      "url": url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${searchUrl}{search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Volcar el JSON estructurado al textarea
    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(websiteJson, null, 2)}\n<\/script>`;

    // Mostrar modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  // Copiado interactivo
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
