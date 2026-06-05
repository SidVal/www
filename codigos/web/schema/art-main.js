// codigos/web/schema/art-main.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('articleForm');
  const contentTypeSelect = document.getElementById('contentType');
  const reviewFields = document.getElementById('reviewFields');
  
  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  // Mostrar u ocultar campos condicionales según el tipo elegido
  contentTypeSelect.addEventListener('change', () => {
    if (contentTypeSelect.value === 'Review') {
      reviewFields.classList.remove('hidden');
      document.getElementById('reviewItem').setAttribute('required', 'true');
      document.getElementById('reviewRating').setAttribute('required', 'true');
    } else {
      reviewFields.classList.add('hidden');
      document.getElementById('reviewItem').removeAttribute('required');
      document.getElementById('reviewRating').removeAttribute('required');
    }
  });

  // Capturar el envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = contentTypeSelect.value;
    const headline = document.getElementById('artHeadline').value.trim();
    const image = document.getElementById('artImage').value.trim();
    const datePub = document.getElementById('artDatePub').value;
    const dateMod = document.getElementById('artDateMod').value;
    const description = document.getElementById('artDescription').value.trim();
    const authorName = document.getElementById('artAuthorName').value.trim();
    const authorUrl = document.getElementById('artAuthorUrl').value.trim();

    // Estructura base común para el contenido escrito
    let schemaJson = {
      "@context": "https://schema.org",
      "@type": type,
      "headline": headline,
      "description": description,
      "image": image,
      "author": {
        "@type": "Person",
        "name": authorName,
        "url": authorUrl,
        "id": authorUrl
      }
    };

    // Añadir fechas solo si aplica al tipo (Review no exige obligatoriamente datePublished)
    if (type === 'BlogPosting' || type === 'TechArticle') {
      schemaJson.datePublished = datePub;
      schemaJson.dateModified = dateMod ? dateMod : datePub;
    }

    // Adaptaciones específicas según el formato seleccionado
    if (type === 'Review') {
      const itemReviewed = document.getElementById('reviewItem').value.trim();
      const ratingValue = document.getElementById('reviewRating').value;

      schemaJson.itemReviewed = {
        "@type": "Product",
        "name": itemReviewed
      };
      schemaJson.reviewRating = {
        "@type": "Rating",
        "ratingValue": ratingValue,
        "bestRating": "5",
        "worstRating": "1"
      };
      // Opcional: añadir fecha de la reseña
      schemaJson.datePublished = datePub;
    }

    // Inyectar texto formateado en el modal
    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n<\/script>`;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  // Evento para copiar código
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
      alert('Error al copiar. Por favor hazlo manualmente.');
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
