document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  // Capturar el envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los valores de los inputs
    const name = document.getElementById('name').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const image = document.getElementById('image').value.trim();
    const url = document.getElementById('url').value.trim();
    const description = document.getElementById('description').value.trim();
    
    // Procesar campos con listas separadas por comas
    const sameAsRaw = document.getElementById('sameAs').value;
    const sameAs = sameAsRaw ? sameAsRaw.split(',').map(item => item.trim()).filter(Boolean) : [];

    const knowsAboutRaw = document.getElementById('knowsAbout').value;
    const knowsAbout = knowsAboutRaw ? knowsAboutRaw.split(',').map(item => item.trim()).filter(Boolean) : [];

    // Construir el objeto JSON-LD estructurado
    const schemaJson = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": name,
      "jobTitle": jobTitle,
      "image": image,
      "url": url,
      "description": description
    };

    // Agregar arreglos opcionales solo si tienen datos
    if (sameAs.length > 0) schemaJson.sameAs = sameAs;
    if (knowsAbout.length > 0) schemaJson.knowsAbout = knowsAbout;

    // Convertir a texto con formato legible e inyectarlo en el textarea
    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n<\/script>`;

    // Mostrar el modal quitando la clase 'hidden' y agregando flex para centrarlo
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  // Evento para copiar el código al portapapeles
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(schemaTextArea.value);
      
      // Feedback visual temporal en el botón
      const originalText = copyBtn.innerText;
      copyBtn.innerText = '¡Copiado con éxito! ✓';
      copyBtn.classList.replace('bg-blue-600', 'bg-green-600');
      
      setTimeout(() => {
        copyBtn.innerText = originalText;
        copyBtn.classList.replace('bg-green-600', 'bg-blue-600');
      }, 2000);
    } catch (err) {
      alert('No se pudo copiar automáticamente. Por favor, selecciónalo manualmente.');
    }
  });

  // Funciones para cerrar el modal
  const closeModal = () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  closeModalBtn.addEventListener('click', closeModal);
  
  // Cerrar si hacen clic fuera del contenedor blanco del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
