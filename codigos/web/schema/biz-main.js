document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('businessForm');
  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener valores básicos del negocio
    const name = document.getElementById('bizName').value.trim();
    const phone = document.getElementById('bizPhone').value.trim();
    const mapsUrl = document.getElementById('bizMapsUrl').value.trim();
    const openingHours = document.getElementById('bizHours').value.trim();
    const priceRange = document.getElementById('bizPriceRange').value;

    // Obtener datos de dirección
    const street = document.getElementById('bizStreet').value.trim();
    const locality = document.getElementById('bizLocality').value.trim();
    const region = document.getElementById('bizRegion').value.trim();
    const country = document.getElementById('bizCountry').value.trim().toUpperCase();

    // Crear la estructura de marcado LocalBusiness
    const businessJson = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": name,
      "telephone": phone,
      "url": window.location.origin, // Captura automáticamente la URL base del sitio donde corre
      "hasMap": mapsUrl,
      "sameAs": [mapsUrl], // Duplicarlo aquí refuerza la identidad en perfiles externos para la IA
      "priceRange": priceRange,
      "openingHours": openingHours,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": street,
        "addressLocality": locality,
        "addressRegion": region,
        "addressCountry": country
      }
    };

    // Volcar datos formateados al textarea
    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(businessJson, null, 2)}\n<\/script>`;

    // Abrir ventana modal
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

  // Controladores del cierre de ventana
  const closeModal = () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
