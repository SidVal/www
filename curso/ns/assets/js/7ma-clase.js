let btn = document.querySelector("button");
let h2 = document.querySelector("h2");
// btn.addEventListener("click",function(){
// h2.style.color="red";
// });


btn.addEventListener("click",function(){
    document.querySelector("#hora").textContent = Date(); // SimpleDateFormat("yyyy-MM-dd");
    });

// Tarea 

// Crea un boton en HTML y coloca como texto <<Activar>>. Luego en tu archivo CSS dale un background-color: red;
// Agrega al botón los siguientes eventos en JS: click, mouseenter, mouseleave. (Recuerda obtener el elemento para luego manipularlo con cada uno de los eventos que tienes que crear).
// En las funciones vinculadas al evento programa lo siguiente.

let btn1 = document.getElementById("btn1");

btn1.addEventListener("click", desactivar);
btn1.addEventListener("mouseenter", verde);
btn1.addEventListener("mouseleave", defecto);

function desactivar() {
    btn1.textContent = "Desactivado";
    //return btn1;
};

function verde() {
    btn1.style.backgroundColor = "green";
};

function defecto() {
    btn1.textContent = "Activar";
    btn1.style.backgroundColor = "red";
};

// Evento click: Programa que cuando se haga click, el texto del botón, se cambie por el string “Desactivado”.
// Evento mouseenter: Cuando entre el cursor al botón, este cambie de color a verde.
// Evento mouseleave: Cuando se salga el cursor del botón, que vuelva al color que predeterminamos en CSS. 

// Mostrando los datos introducidos en un formulario al usuario.

// Crea  3 campos(input) en HTML, Usuario,Nombre, email. (No olvides darle un id a cada uno de los campos creados)
// En JS, obtén cada uno de los elementos input que creaste, mediante el método querySelector().
// Manipula los elementos para obtener su valor con la propiedad JS value y muestra esos datos al Usuario con un alert que le diga:

// “Estos fueron los datos ingresados
// Usuario: Pepito123
// Nombre: Pepito lavalle
// Mail: pepito12@gmail.com”

let usuario, nombre, mail;
usuario = document.getElementById("usuario");
nombre = document.getElementById("nombre");
mail = document.getElementById("mail");

function datos() {
    let salto = "\n"
    alert("Estos fueron los datos ingresados" + salto + "Usuario: " + usuario.value + salto + "Nombre: " + nombre.value + salto + "Mail: " + mail.value);
    return null;
}