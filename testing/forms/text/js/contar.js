document.addEventListener("DOMContentLoaded", function() {

    // Función para calcular estadísticas SEO
    function calcularEstadisticasSEO() {
        const textArea = document.getElementById("text-area");
        const seoStatsContainer = document.getElementById("seo-stats");
        const texto = textArea.value;

        
        


        // Tokenizar el texto en palabras
        const delimitador = ",.!?;:(){}[]<>'\""; // delimitador para excluir de las palabras
        const palabras = texto.split(delimitador).filter(palabra => palabra !== "");
    
        // Lista de verbos comunes (stop verbs) que queremos excluir
        const stopVerbs = [
            "pueden", "bailan"
        ];

        let stopWords; // Definir stopWords fuera de la función then

        // Cargar el JSON de stop words desde la URL
        fetch('https://raw.githubusercontent.com/SidVal/stopwords-es/master/stopwords-es.json')
            .then(response => response.json())
            .then(data => {
                stopWords = data; // Asignar los datos a la variable stopWords

                // Continuar con el procesamiento después de cargar los datos
                continuarProcesamiento();
            })
            .catch(error => console.error('Error al cargar el JSON:', error));

        // Función para continuar con el procesamiento después de cargar los datos
        function continuarProcesamiento() {
            // Excluir palabras comunes y verbos
            const palabrasFiltradas = palabras.filter(palabra => !stopWords.includes(palabra.toLowerCase()) && !stopVerbs.includes(palabra.toLowerCase()));

            // Resto del código para calcular y mostrar estadísticas
            // Contador de palabras
            const totalPalabras = palabrasFiltradas.length;

            // Cantidad de caracteres (con espacios)
            const caracteresConEspacios = texto.length;

            // Cantidad de caracteres (sin espacios)
            const caracteresSinEspacios = texto.replace(/\s/g, "").length;

            // Calcular la densidad de palabras clave para cada palabra clave
            const palabrasClave = calcularPalabrasClave(palabrasFiltradas, 10);
            const densidadPalabrasClave = calcularDensidadPalabrasClave(palabrasFiltradas, palabrasClave);

            // Mostrar las estadísticas
            seoStatsContainer.innerHTML = `
                    <p>Total de palabras: ${totalPalabras}</p>
                    <p>(${palabrasClave.length}) Palabras repetidas: ${palabrasClave.join(", ")}</p>
                    ${palabrasClave.map((palabra, index) => `<p>Densidad de "${palabra}": ${densidadPalabrasClave[index].toFixed(2)}%</p>`).join("")}
                    <p>Caracteres (con espacios): ${caracteresConEspacios}</p>
                    <p>Caracteres (sin espacios): ${caracteresSinEspacios}</p>
                    `;
        }
    }

    // Escuchar cambios en el textarea y recalcular estadísticas
    const textArea = document.getElementById("text-area");
    textArea.addEventListener("input", calcularEstadisticasSEO);

    // Función para calcular palabras clave (simplemente devuelve las primeras n palabras únicas)
    function calcularPalabrasClave(palabras, n) {
        const palabrasUnicas = [...new Set(palabras)];
        return palabrasUnicas.slice(0, n);
    }

    // Función para calcular densidad de palabras clave
    function calcularDensidadPalabrasClave(palabras, palabrasClave) {
        const densidades = [];
        for (const palabraClave of palabrasClave) {
            const cantidadApariciones = palabras.filter(palabra => palabra === palabraClave).length;
            const densidad = (cantidadApariciones / palabras.length) * 100;
            densidades.push(densidad);
        }
        return densidades;
    }
});
