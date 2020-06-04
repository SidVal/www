//Ejercicios
//  let nave = {
//      "tipo de nave": "espacial",
//      pais: "argentina",
//      "cantidad de tripulantes": 2,
//      tripulantes: ["Pepe","Maxi"],
//      estado: "usada",
//      despegar: true
//  }

//  if(nave.despegar) {despegar();}

//  function despegar() {
//      alert("BOOOOM!!");
//      return console.log("Despegue en 3, 2, 1 … OH NO, ESPEREN, ALGO SE ROMPIÓ!");
//  }

// Ejercicio 2

var posts = [{
        usuario: "guilleasz",
        postContent: "Cada objeto es un post distinto",
        comments: [{
            username: "santiscanlan",
            commentContent: "Gran post!"
        }, {
            username: "toniTralice",
            commentContent: "Malisimo post!"
        }]
    },
    {
        usuario: "tonitralice",
        postContent: "y estan todos ordenados dentro del arreglo",
        comments: [{
            username: "guilleasz",
            commentContent: "ya me quede sin ideas de comentarios"
        }, {
            username: "toniTralice",
            commentContent: "Si yo también"
        }]
    }
]
   // Array con dos objetos
   // dos posts dos autores distintos
   // dentro de cada post, dos comentarios de autores. 

//1. Consulta el valor ( "guilleasz") de la propiedad usuario que se encuentra dentro del primer objeto.
posts[0].usuario

//2. Consulta el valor que dice "Gran post!"
posts[0].comments[0].commentContent

//3. Consulta el valor que dice "santiscanlan".
posts[0].comments[0].username

//4. Consulta el valor "Malísimo post!".
posts[0].comments[1].commentContent

//5. Consulta el valor "y están todos ordenados dentro del arreglo".
posts[1].postContent

//6. Consulta el valor de la última propiedad username.
let ultimoPost = posts.length - 1
let ultimoComent = posts[ultimoPost].comments.length - 1
let ultimoUserName = posts[ultimoPost].comments[ultimoComent].username
ultimoUserName

// EJERCICIO 3: Practicando localstorage
// Agrega datos al storage de una lista de alumnos, con los siguientes items: Nombre, email, asistencia (Presente o ausente). Agrega al menos 3.
// Obtén los datos ingresados al storage y mostrarlos en el HTML en una lista.
// Agrega un evento a los elementos <li> que cuando se haga click  sobre ellos elimine el alumno del HTML y del storage.

let alumnos = [{
    nombre: "Pedro",
    email: "pedro@alumno.com",
    asistencia: "presente"
},{
    nombre: "Maria",
    email: "maria@alumno.com",
    asistencia: "ausente"
},{
    nombre: "Juan",
    email: "juan@alumno.com",
    asistencia: "presente"
}]

localStorage.setItem("Alumnos", JSON.stringify(alumnos))
var guardado = localStorage.getItem("Alumnos");
console.log("Datos", JSON.parse(guardado));

// let nombre = document.querySelector(nom);
let htmlNombre = document.getElementById("datosNombre");
let htmlApellido = document.getElementById("datosApellido");
let htmlMail = document.getElementById("datosMail");

function lista() {
let list = document.createElement('ul');

for (dat of alumnos) {
    let item = document.createElement('li');
    item.appendChild(document.createTextNode(dat.nombre));
    list.appendChild(item);
    item.appendChild(document.createTextNode(dat.asistencia));
    list.appendChild(item);
    item.appendChild(document.createTextNode(dat.email));
    list.appendChild(item);
    htmlNombre.innerHTML = dat.nombre;
    htmlApellido.innerHTML = dat.asistencia;
    htmlMail.innerHTML = dat.email;
}
return list;
}