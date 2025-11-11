(() => {
  const rows = Array.from(document.querySelectorAll("tr"));
  const contacts = [];

  for (let i = 0; i < rows.length; i++) {
    const text = rows[i].innerText.trim();

    if (text.includes("A continuación encontrarás una copia del email de confirmación de inscripción para")) {
      let name = "";
      let email = "";

      // Buscar el tr siguiente que tenga un texto corto y sin arroba (nombre)
      let j = i + 1;
      while (j < rows.length) {
        const t = rows[j].innerText.trim();
        if (t && !/@/.test(t) && t.length < 80) {
          name = t.replace(/\s+/g, " ");
          break;
        }
        j++;
      }

      // Buscar el siguiente tr con email
      while (j < rows.length) {
        const t = rows[j].innerText.trim();
        const emailMatch = t.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
        if (emailMatch) {
          email = emailMatch[0];
          break;
        }
        j++;
      }

      if (name && email && !/noreply|eventbrite|order/i.test(email)) {
        contacts.push({ name, email });
      }
    }
  }

  // Eliminar duplicados
  const uniqueContacts = Array.from(new Map(contacts.map(c => [c.email, c])).values());

  if (uniqueContacts.length === 0) {
    alert("No se encontraron contactos válidos.");
    return;
  }

  // Generar CSV
  let csv = "Nombre,Correo electrónico\n";
  csv += uniqueContacts.map(c => `"${c.name}","${c.email}"`).join("\n");

  console.log(csv);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "contactos.csv";
  link.click();
})();
