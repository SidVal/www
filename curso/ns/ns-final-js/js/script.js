"use strict";
// 3 funciones
// guardarDatos() : Esta función debería tomar los valores de los campos del formulario y guardar los datos en el localstorage. 
// mostrarDatos(): Para mostrar los datos debemos obtener los valores guardados en el localStorage e ir dibujandolos en la tabla. Recomendación trabaja este paso con innerHTML y no con createElement, se te hará más fácil.
// eliminarTodo(): Limpia todo el storage y el DOM.

function eliminarTodo() {
    let form = document.getElementById("form");
    if (confirm("¿Borrar todo?") == true) {
        form.reset();
        localStorage.clear();
        location.reload(); //recargo para que vuelva todo a cero
    }
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
if (window.localStorage.length >= 1) {
    let items = JSON.parse(localStorage.getItem("Artículos"));
    let tbody = document.querySelector("tbody");

    if (document.querySelectorAll("#row").length < items.length) { 
        for (let dato of items) {
        contador = contador + 1;
        tbody.innerHTML += `<tr><th scope="row" id="row">${contador}</th><td>${dato["Artículo"]}</td><td>${dato["Cantidad"]} <abbr title="Unidades">un.</abbr></td><td><abbr title="Pesos Argentinos">AR$</abbr> ${dato["Precio"]}</td></tr>`;
        //console.log("Items " + items.length);
        //console.log(dato["Artículo"].length);
        let form = document.getElementById("form");
        let elementos = form.elements;
        for (let elem of elementos) {
            elem.disabled = true;
        }
        btnEliminarE.classList.remove('disabled');
        btnMostrarE.classList.add('disabled');
        }
    } else {
        alert("Se están visualizando todos los datos. \n Si deseas agregar más, elimina todo y comienza de cero.");
        document.getElementById("eliminar").focus();
        //valido que si ya mostré datos no permita agregar más datos nuevos. Habría que empezar de nuevo.
        }

    return "Datos mostrados";
} else {
    alert("Primero debes CARGAR y GUARDAR datos. \n\n No hay datos para mostrar");
}
    
}

// variables globales
let btnEliminarE = document.getElementById("eliminar");
let btnGuardar = document.getElementById("btn-guardar");
let btnMostrarE = document.getElementById("btn-mostrar");

// validar si localStorage tiene datos, en caso de que no tenga, la lista está vacía
// if (window.localStorage.length >= 1) {
//     let lista = JSON.parse(localStorage.getItem("Artículos"));
// }
// else {
// let lista = [];
// }
let contador = 0; // para mostrar datos
let lista = []; // para cargar datos

//let datos = []; (no recuerdo para qué era, pero por el momento no sirve)

let producto,cantidad,precio;
producto = document.getElementById("nombreProducto");
cantidad = document.getElementById("cantidad");
precio = document.getElementById("precio");




// Eventos

btnEliminarE.addEventListener("click",eliminarTodo);
// btnGuardar.addEventListener("click",guardarDatos); va en el validador del form.
btnMostrarE.addEventListener("click",mostrarDatos);

// funciones adicionales

function validar() {
// control producto
if (producto.value.length <= 3) {
    producto.classList.add('border');
    producto.classList.add('border-danger');
} else {
    producto.classList.remove('border');
    producto.classList.remove('border-danger');
}
// control cantidad

// control precio

    // Controlo que se completen los campos para cargar el objeto completo y sin errores
    if ((producto.value.length >= 4) && (cantidad.value > 0) && (precio.value > 0)) {
        btnGuardar.classList.remove('disabled');
        btnGuardar.addEventListener("click", guardarDatos);
    } else {
        btnGuardar.classList.add('disabled');
        btnGuardar.removeEventListener("click", guardarDatos);
    }
}