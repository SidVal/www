/* Ejercicios Clase 1

1. Variables
  a. Declara una variable llamada uno en tu consola y asígnale un número cualquiera.
  b. Declara una variable llamada dos y asígnale como valor lavariable uno.
  c. Cambia el valor de la variable uno. ¿Cuál piensas que es ahora el valor de la variable dos? (Pensaloantes de fijarte en la consola).

2. Mensaje con Variables
  a. Declara 5 variables: 'nombre', 'edad', 'ciudad', 'ocupacion' y'hobbie', y asígnales valores que contengan información sobrevos mismo.
  b. Usa console.log para escribir un párrafo sobre vos, usando las variables que creaste para insertar la información correspondiente.
  c. DESAFÍO BONUS: busca si hay alguna manera de crear múltiples variables en una única línea de código.

3. Calculador de Edad
    Se debe preguntar al usuario su edad y calcular en base a su respuesta la cantidad de días que tienen esos años.
    Muestra la respuesta a través de una alerta.

4. Pedir al usuario un número y sumarle 5.

*/

// ### Primer Punto: Variables ###
// 'use strict' // aún no entiendo bien qué pasaría si no declaro esto; probé y no me dió ningún error, pero me imagino que es para cuando se usen funciones en la programación de js.

// var uno = 3;
// var dos = uno;
// uno = 5;
// La variable uno quedará con valor 5, mientras que la variable dos, quedaría con valor 3 (pues es el valor original que se asignó a la variable uno)

// ### Segundo punto: Mensaje con Variables ###

// Punto "a", declaración de variables, una por una. 
// var nombre = "Osvaldo";
// var edad = 37;
// var ciudad = "Córdoba";
// var ocupacion = "Comerciante";
// var hobbie = "Pescar";

// Punto "Bonus", declarar todas las variables en una línea.
var nombre = "Osvaldo", edad = 37, ciudad = "Córdoba", ocupacion = "Comerciante", hobbie = "Pescar";

// Punto "b" para usar console.log 
console.log("Hola ¿cómo están? Mi nombre es " + nombre + ". Tengo " + edad + " años, soy de la ciudad de " + ciudad + ". Trabajo como " + ocupacion + " y cuando tengo tiempo (y se podía salir lejos porque no había COVID-19) me escapo a " + hobbie + ".");
// Resultado en la consola:
// Hola ¿cómo están? Mi nombre es Osvaldo. Tengo 37 años, soy de la ciudad de Córdoba. Trabajo como Comerciante y cuando tengo tiempo (y se podía salir lejos porque no había COVID-19) me escapo a Pescar.

// ### Tercer Punto: Calcular Edad ###
// Se debe preguntar al usuario su edad y calcular en base a su respuesta la cantidad de días que tienen esos años. Muestra la respuesta a través de una alerta.
// const anio = 365; //use la constante porque no cambiaría nunca esta variable, siempre sería 365 días. (ver bug)
// var edad = parseInt(prompt("¿Cuál es tu edad? Saltará alerta con la cantidad de días que has vivido!"));
// var dias = (edad * anio);
// var msg = "Has vivido: " + dias + " días. Espero estés disfrutando! =)"
// alert(msg);

// Bug: evidentemente la persona vivió años biciestos que ocurre cada 4 años, así que habría que meter una corrección al código para que cada 4 años sume 1 día de vida.


// ### Cuarto Punto: Pedir número y sumar 5 ###

// var num = parseInt(prompt("Ingresa un número y sumaré 5, saldrá respuesta vía alerta!"));
// alert(num + 5);


