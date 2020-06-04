// 3 funciones
// guardarDatos() : Esta función debería tomar los valores de los campos del formulario y guardar los datos en el localstorage. 
// mostrarDatos(): Para mostrar los datos debemos obtener los valores guardados en el localStorage e ir dibujandolos en la tabla. Recomendación trabaja este paso con innerHTML y no con createElement, se te hará más fácil.
// eliminarTodo(): Limpia todo el storage y el DOM.

function eliminarTodo() {
    let form = document.getElementById("form")
    form.reset();
    localStorage.clear();
}


function guardarDatos() {

    let articulo = {
        "Artículo": producto.value,
        "Cantidad": cantidad.value,
        "Precio": precio.value
    }

    lista.push(articulo);
    localStorage.setItem("Artículos",JSON.stringify(lista));
}

function mostrarDatos() {
    let items = JSON.parse(localStorage.getItem("Artículos"));
    let tbody = document.querySelector("tbody");
    let contador = 0;

    for (let dato of items) {
        contador = contador + 1;
        tbody.innerHTML += `<tr><th scope="row">${contador}</th><td>${dato["Artículo"]}</td><td>${dato["Cantidad"]} un.</td><td>$ ${dato["Precio"]}</td></tr>`;
        console.log(contador);
        console.log(dato["Artículo"]);
    }

    return null;
}

// variables globales
let btnEliminar = document.getElementById("eliminar");
let btnGuardar = document.getElementById("btn-guardar");
let lista = [];
let datos = [];

let producto,cantidad,precio;
producto = document.getElementById("nombreProducto");
cantidad = document.getElementById("cantidad");
precio = document.getElementById("precio");




// Eventos

btnEliminar.addEventListener("click",eliminarTodo);
btnGuardar.addEventListener("click",guardarDatos);

// funciones adicionales

function validar() {
        // Controlo que se completen los campos para cargar el objeto completo y sin errores
        if (producto.value.length > 4 && cantidad.value > 0 && precio.value > 0) { 
            btnGuardar.classList.remove('disabled');
            } else { btnGuardar.classList.add('disabled') }
}

form