// codigos/web/schema/course-main.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('courseForm');
  const modulesContainer = document.getElementById('modulesContainer');
  const addModuleBtn = document.getElementById('addModuleBtn');

  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  addModuleBtn.addEventListener('click', () => {
    const div = document.createElement('div');
    div.className = 'flex gap-2';
    div.innerHTML = `
      <input type="text" required placeholder="Ingresa otro módulo del curso..."
             class="course-module w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
      <button type="button" class="remove-module text-red-500 hover:text-red-700 font-bold px-2 cursor-pointer">&times;</button>
    `;

    div.querySelector('.remove-module').addEventListener('click', () => {
      div.remove();
    });

    modulesContainer.appendChild(div);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('courseName').value.trim();
    const description = document.getElementById('courseDescription').value.trim();
    const url = document.getElementById('courseUrl').value.trim();
    const image = document.getElementById('courseImage').value.trim();

    const providerName = document.getElementById('courseProvider').value.trim();
    const providerType = document.getElementById('providerType').value;
    const instructorName = document.getElementById('courseInstructor').value.trim();

    const courseMode = document.getElementById('courseMode').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const workload = document.getElementById('courseWorkload').value.trim();
    const location = document.getElementById('courseLocation').value.trim();

    const price = document.getElementById('coursePrice').value;
    const currency = document.getElementById('courseCurrency').value;
    const offerUrl = document.getElementById('offerUrl').value.trim();

    const moduleInputs = modulesContainer.querySelectorAll('.course-module');
    const modulesList = Array.from(moduleInputs)
      .map(input => input.value.trim())
      .filter(Boolean);

    const courseJson = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": name,
      "description": description,
      "url": url,
      "provider": {
        "@type": providerType,
        "name": providerName
      }
    };

    if (image) {
      courseJson.image = image;
    }

    if (modulesList.length > 0) {
      courseJson.hasPart = modulesList.map((moduleName, index) => ({
        "@type": "LearningResource",
        "position": index + 1,
        "name": moduleName
      }));
    }

    const courseInstance = {
      "@type": "CourseInstance",
      "courseMode": courseMode
    };

    if (startDate) {
      courseInstance.startDate = startDate;
    }

    if (endDate) {
      courseInstance.endDate = endDate;
    }

    if (workload) {
      courseInstance.timeRequired = workload;
    }

    if (instructorName) {
      courseInstance.instructor = {
        "@type": "Person",
        "name": instructorName
      };
    }

    if (location) {
      courseInstance.location = {
        "@type": courseMode === "online" ? "VirtualLocation" : "Place",
        "name": location
      };

      if (courseMode === "online" && isValidUrl(location)) {
        courseInstance.location.url = location;
      }
    }

    if (price || offerUrl) {
      courseInstance.offers = {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
      };

      if (price) {
        courseInstance.offers.price = price;
        courseInstance.offers.priceCurrency = currency;
      }

      if (offerUrl) {
        courseInstance.offers.url = offerUrl;
      } else {
        courseInstance.offers.url = url;
      }
    }

    courseJson.hasCourseInstance = courseInstance;

    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(courseJson, null, 2)}\n<\/script>`;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

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

  const closeModal = () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  closeModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function isValidUrl(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
});
