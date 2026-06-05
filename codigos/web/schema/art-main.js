// codigos/web/schema/art-main.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('articleForm');
  const contentTypeSelect = document.getElementById('contentType');
  const reviewFields = document.getElementById('reviewFields');

  const modal = document.getElementById('schemaModal');
  const schemaTextArea = document.getElementById('schemaOutput');
  const closeModalBtn = document.getElementById('closeModal');
  const copyBtn = document.getElementById('copySchema');

  const reviewItemInput = document.getElementById('reviewItem');
  const reviewRatingInput = document.getElementById('reviewRating');
  const reviewItemTypeSelect = document.getElementById('reviewItemType');

  contentTypeSelect.addEventListener('change', () => {
    const isReview = contentTypeSelect.value === 'Review';

    reviewFields.classList.toggle('hidden', !isReview);

    reviewItemInput.toggleAttribute('required', isReview);
    reviewRatingInput.toggleAttribute('required', isReview);

    if (reviewItemTypeSelect) {
      reviewItemTypeSelect.toggleAttribute('required', isReview);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = getValue('contentType');
    const headline = getValue('artHeadline');
    const pageUrl = getValue('artUrl');
    const image = getValue('artImage');
    const datePub = getValue('artDatePub');
    const dateMod = getValue('artDateMod') || datePub;
    const description = getValue('artDescription');
    const authorName = getValue('artAuthorName');
    const authorUrl = getValue('artAuthorUrl');
    const publisherName = getValue('artPublisherName');
    const publisherLogo = getValue('artPublisherLogo');
    const keywords = getValue('artKeywords');

    const warnings = validateInputs({
      type,
      headline,
      pageUrl,
      image,
      datePub,
      dateMod,
      description,
      authorName,
      authorUrl,
      publisherName,
      publisherLogo
    });

    if (warnings.length > 0) {
      const shouldContinue = confirm(
        `Detecté posibles mejoras antes de generar el schema:\n\n- ${warnings.join('\n- ')}\n\n¿Querés generarlo igual?`
      );

      if (!shouldContinue) {
        return;
      }
    }

    const schemaJson = cleanObject({
      "@context": "https://schema.org",
      "@type": type,
      "@id": pageUrl ? `${pageUrl}#schema-${type.toLowerCase()}` : undefined,
      "mainEntityOfPage": pageUrl
        ? {
            "@type": "WebPage",
            "@id": pageUrl
          }
        : undefined,
      "url": pageUrl || undefined,
      "headline": headline,
      "description": description,
      "image": image ? [image] : undefined,
      "inLanguage": "es",
      "datePublished": datePub || undefined,
      "dateModified": dateMod || undefined,
      "author": cleanObject({
        "@type": "Person",
        "@id": authorUrl ? `${authorUrl}#person` : undefined,
        "name": authorName,
        "url": authorUrl || undefined
      }),
      "publisher": publisherName
        ? cleanObject({
            "@type": "Organization",
            "name": publisherName,
            "logo": publisherLogo
              ? {
                  "@type": "ImageObject",
                  "url": publisherLogo
                }
              : undefined
          })
        : undefined,
      "keywords": keywords
        ? keywords.split(',').map(keyword => keyword.trim()).filter(Boolean)
        : undefined
    });

    if (type === 'Review') {
      const itemReviewed = getValue('reviewItem');
      const ratingValue = getValue('reviewRating');
      const itemReviewedType = getValue('reviewItemType') || 'Thing';

      schemaJson.itemReviewed = {
        "@type": itemReviewedType,
        "name": itemReviewed
      };

      schemaJson.reviewRating = {
        "@type": "Rating",
        "ratingValue": Number(ratingValue),
        "bestRating": 5,
        "worstRating": 1
      };
    }

    schemaTextArea.value = `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n<\/script>`;

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
      alert('Error al copiar. Por favor hacelo manualmente.');
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

  function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : '';
  }

  function validateInputs(data) {
    const warnings = [];

    if (!isValidUrl(data.pageUrl)) {
      warnings.push('La URL canónica del contenido falta o no parece válida.');
    }

    if (!isValidUrl(data.image)) {
      warnings.push('La URL de imagen falta o no parece válida.');
    }

    if (data.authorUrl && !isValidUrl(data.authorUrl)) {
      warnings.push('La URL del autor no parece válida.');
    }

    if (data.publisherLogo && !isValidUrl(data.publisherLogo)) {
      warnings.push('La URL del logo del publisher no parece válida.');
    }

    if (data.headline.length > 110) {
      warnings.push('El headline es bastante largo. Podría ser menos claro en resultados enriquecidos.');
    }

    if (data.description.length < 50) {
      warnings.push('La descripción parece muy corta. Conviene que explique mejor el contenido.');
    }

    if (data.datePub && data.dateMod && data.dateMod < data.datePub) {
      warnings.push('La fecha de modificación es anterior a la fecha de publicación.');
    }

    if (data.type === 'Review') {
      const rating = Number(getValue('reviewRating'));

      if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        warnings.push('La calificación de la reseña debe estar entre 1 y 5.');
      }
    }

    return warnings;
  }

  function isValidUrl(value) {
    if (!value) return false;

    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  function cleanObject(value) {
    if (Array.isArray(value)) {
      return value
        .map(cleanObject)
        .filter(item => item !== undefined && item !== null && item !== '');
    }

    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value)
          .filter(([, item]) => item !== undefined && item !== null && item !== '')
          .map(([key, item]) => [key, cleanObject(item)])
      );
    }

    return value;
  }
});
