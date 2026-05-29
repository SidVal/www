document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('articleForm');
  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  // Capturar el envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los valores de los inputs
    const headline = document.getElementById('artHeadline').value.trim();
    const image = document.getElementById('artImage').value.trim();
    const datePub = document.getElementById('artDatePub').value;
    const dateMod = document.getElementById('artDateMod').value;
    const description = document.getElementById('artDescription').value.trim();
    const authorName = document.getElementById('artAuthorName').value.trim();
    const authorUrl = document.getElementById('artAuthorUrl').value.trim();

    // Construir el objeto JSON-LD estructurado (BlogPosting / Article)
    const articleJson = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": headline,
      "description": description,
      "image": image,
      "datePublished": datePub,
      "dateModified": dateMod ? dateMod : datePub, // Si no hay modificación usa la de publicación
      "author": {
        "@type": "Person",
        "name": authorName,
        "url": authorUrl,
        "id": authorUrl // El 'id' conecta este artículo con el grafo de identidad del profesional
      }
    };

    // Convertir a texto JSON estructurado legible e inyectarlo en el textarea
    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(articleJson, null, 2)}\n<\/script>`;

    // Mostrar el modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  // Evento para copiar el código al portapapeles
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(schemaTextArea.value);
      
      // Feedback visual en el botón
      const originalText = copyBtn.innerText;
      copyBtn.innerText = '¡Copiado con éxito! ✓';
      copyBtn.classList.replace('bg-blue-600', 'bg-green-600');
      
      setTimeout(() => {
        copyBtn.innerText = originalText;
        copyBtn.classList.replace('bg-green-600', 'bg-blue-600');
      }, 2000);
    } catch (err) {
      alert('No se pudo copiar de manera automática. Selecciona el texto manualmente.');
    }
  });

  // Funciones para ocultar el modal
  const closeModal = () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  closeModalBtn.addEventListener('click', closeModal);
  
  // Cerrar si hacen clic en el fondo difuminado del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
