/* Array: colección de datos agrupados en una misma estructura. Básicamente es un contenedor de muchos valores a la vez bajo la misma variable. 

Caracteristicas: 
    - Pueden almacenar cualquier tipo de dato 
    - Una propiedad principal de esto es la longitud (length) que es igual a la cantidad de elementos
    - Cada elemento del array ocupa una posición (índice). Las posiciones inician a contar en 0.
*/


// Array con el mismo tipo de dato
var dias= ["Lunes","Martes","Miercoles","Jueves","Viernes","Sábado","Domingo"];
    
console.log(dias.length); //longitud exacta del array (cantidad de valores)

// Array con distintos tipos de datos 
var prueba = [1, "Lunes", {}, ["Juan", "Paula"],true, false];

// Sobreescribir un valor dentro del array
var productos = ["Tv", "Notebook", "Impresora", "Plancha", "Lavarropas","Secador de Pelo", "Smartphone", "Aire Acondicionado", "Tablet"];
productos[2] = "Monitor";

// Agregar un valor al array conociendo el índice
productos[8] = "Cafetera";

// Agrega un valor a la primer posición (Método unshift)
productos.unshift("Licuadora");

// Agregar un valor a la última posición (Método Push)
productos.push("Tostadora");

// Elimina el primer valor (Método shift)
productos.shift();

// Elimina el último valor (Método Pop)
productos.pop();

// Extraer un rango de valores (Método slice)
var productosExtraidos= productos.slice(3,6);

// Se definen variables a cada elemento de un array 
var frutas = ["manzana", "pera","naranja"];
var [f1,f2,f3] = frutas;

// Ordenar valores de inicio a fin (Método sort)
var letras = ["x", "a", "y", "n", "z"];
letras.sort();

// Ordenar valores de fin a inicio (Método reverse) 
letras.reverse(); 

// Convierte un array a un string
var numeros = [34, 56, 94, 983, 1045];
numeros.join (',');

// Convertir un string en un array 
var textos = "texto1, texto2, texto3"; 
textos.split(",");

// Concatenación
var numeros2 = [90, 98, 0, 5000, 94];
var concatFinal= numeros.concat(numeros2);

// Encontrar la posición de un valor 
concatFinal.indexOf(98);



// Utilizando métodos para recorrer arrays. 

//  for loop (manera que se fue trabajando hasta ahora)
var nombres= ["Luis", "José","Mariana", "Antonia", "Juana"];
for(var i=0; i<nombres.length;i++){
document.write(nombres[i]+ "<br>");
}

// for of
var nombres= ["Luis", "José","Mariana", "Antonia", "Juana"];
for(var nombre of nombres){
document.write(nombre + "<br>");
}  
// Declaro un elemento, nombre, que es la que va a iterar cada elemento del array. 


// .forEach: es un método que nos permitirá acceder a cada elemento de un array a través de una función que recibe el elemento, la posición del elemento y el array que se está recorriendo 
var nombres= ["Luis", "José","Mariana", "Antonia", "Juana"];
nombres.forEach (nombre => document.write(nombre+ "<br>"));


//.some(): se utiliza cuando se quiere saber si algunos de los elementos cumple con una condición 
var nombres= ["Luis", "José","Mariana", "Antonia", "Juana"];
nombres.some( elemento => elemento=== "Juana");

//.every(): se utiliza cuando se quiere saber si todos cumplen con la condición  
var nombres= ["Luis", "José","Mariana", "Antonia", "Juana"];
nombres.every(elemento => elemento.length>=4);


// .filter(): filtra los elementos que cumpla con una condición 
var numeros= [2, 20, 30, 45, 3, -10, 120, 5, 200];
var arrayFilter = numeros.filter(elemento => elemento >10 && elemento<50)
console.log(arrayFilter);

//find(): es un método de búsqueda sobre el array que sirve para saber si un elemento existe dentro de él o no. 
var nombres= ["Luis", "José","Mariana", "Antonia", "Juana"];
var elemento= nombres.find(elemento => elemento == 'Mariana');
console.log(elemento);

// Ejercicios de tarea
//
// 1. ¿Qué devuelven estas expresiones?
// Pensar sin probarlo en la consola
let numeros =[937, 377, 54, 166, 220];
console.log(numeros[numeros.length]);
// devuelve "undefined" ya que busca la posición [5] (que es el largo del array), y la posición cinco no existe en el array.

let grupoDeAmigos =[
["Pepe","Pedro","Alan"],
["Mike","Pendrive","222"],
["Lunatico","Corna","1111"]
];
console.log(grupoDeAmigos[2][0]);
// devuelve "Lunatico" ya que busca la posición 2 del array, y dentro de la posición 2, busca la posición cero. Es decir, el valor "Lunatico".


// 2. 
// Un estudiante necesita saber el promedio de sus calificaciones que obtuvo en sus materias a modo de control. 
// Una vez que ingresa al sistema se le pedirá: 
// nombre y apellido
// nombre de la materia
// todas las calificaciones obtenidas de dicha materia del 1 al 10.
// No sabemos la cantidad de calificaciones que puede tener el usuario.
// Se le deberá mostrar en pantalla el siguiente resultado:
     
// Nombre y Apellido: Pepe Milano
// Materia: X (el nombre de la materia previamente cargada)
// Promedio final: 7.45

function promedio() {

    let nombreA, materia, calif, notas, suma, cantidadNotas;
    calif = [];
    nombreA = prompt("¿Cuál es tu nombre y apellido?");
    materia = prompt("¿Qué materia cursas?");
    cantidadNotas = Number(prompt("¿Cuántos exámenes tuviste?"));
    for (let contador = 1; contador <= cantidadNotas; contador++) {
        notas = parseFloat(prompt("Escribe tu nota en el exámen número " + contador));
        calif.push(notas);
    }
    suma = calif.reduce((a, b) => a + b, 0);
    let promedio = suma / calif.length;
    const salto = "\n";
    return alert("Nombre y Apellido: " + nombreA + salto + "Materia: " + materia + salto + "Promedio final: " + promedio);
}


// 3. Del siguiente arrays mostrar cuales son los números pares y cuáles impares:

let numeros = [10, 4, 8, 1, 19, 5, 3, 8, 11, 18, 33, 45, 99, 14, 22, 18, 23]
for (i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 == 0) {
        document.write("El número " + numeros[i] + " es par <br />")
    } else {
        {
            document.write("El número " + numeros[i] + " es impar <br />")
        }
    }
}


// 4. Crea una función sumArray que acepte un arreglo de números y devuelva la suma de todos los números del arreglo. Usa el código de abajo para testear tu función:   
	// sumArray([1,2,3]) // 6
    // sumArray([10, 3, 10, 4]) // 27
    // sumArray([-5,100]) // 95


function sumArray(arreglo) {
    let suma = arreglo.reduce((a, b) => a + b, 0);
    return suma;
}

// Clase 5 (Extras)
// 1. Mostrar los divisores de un número que introduzca el usuario. 

function divisores(x) {
    for (let i=1; i<=x; i++) {
        if (x%i == 0) {
            document.write(i + " es divisor del número " + x + ".<br />");
        }
    }
    return null;
}

// 2. Se le pedirá al usuario ingresar una letra y se le deberá informar si es o no una letra vocal.

function vocal(x) {
    if (x.length == 1) {
    x = x.toUpperCase;
    let check;
    check = (x == "A" || x == "E" || x == "I" || x == "O" || x == "U");
    if (check) {document.write("Es vocal <br />")} else {"No vocal <br />"}
    return check //devuelve true si es vocal.
    } else {
        vocales();
    }    
}

function vocales() {
    let x = prompt("Escribe una letra cualquiera (UNA SOLA): ").toUpperCase;
    if (x.length == 1) {
    let check;
    check = (x == "A" || x == "E" || x == "I" || x == "O" || x == "U");
    if (check) {document.write("Es vocal <br />")} else {"No vocal <br />"}
    return check //devuelve true si es vocal.
    } else {
        vocales();
    }    
}



// 3. Pedir al usuario que ingrese 3 palabras y luego informar cual es la palabra con mayor cantidad de letras junto a la cantidad.


function palabras() {
    let pal,cantidadPal;
    cantidadPal = 3;
    palabras = [];

    for (let contador = 1; contador <= cantidadPal; contador++) {
        pal = prompt("Escribe tu palabra y darle ENTER");
        palabras.push(pal);
    }

    let limite = palabras.length;
    let largo = 0;
    for (let i = 0; i <= limite; i++) {
        if (palabras[i].length > largo) {
            largo = palabras[i].length;
        }
    }

    let resultado = document.write("La palabra con mayor cantiad de letras que ingresaste es: " + palabras[largo] + " con " + largo + " palabras.");

return resultado;
}


// ----------
// v2

function palabras([]) {
    let pal,cantidadPal;
    //palabras = [];
    cantidadPal = 3;
    let largo = 0;

    for (let contador = 1; contador <= cantidadPal; contador++) {
        pal = prompt("Escribe tu palabra y darle ENTER");
        palabras.push(pal);
        if (palabras[contador].length > largo) {
            largo = palabras[contador].length;
        }
    }

return document.write("La palabra con mayor cantiad de letras que ingresaste es: " + palabras[largo] + " con " + largo + " palabras.");
}
