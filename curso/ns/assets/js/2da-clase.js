// 29/04/20 :: Variables Condicionales

/* ---  Aplicando var --- */
  // Dentro del bloque de llaves var es entendido
  {
	var nombre= "Santiago";
	console.log(nombre); 
   }
 
   // Fuera del bloque de llaves var es entendido
   {
	var apellido="Ramirez";
   } 
   console.log(apellido); 
 
 
 /* ---  Aplicando let --- */
 
   // Dentro del bloque de llaves let es entendido
   {
	let direccion="Av. Rivadavia 3000";
	console.log(direccion); 
   } 
 
   // Fuera del bloque de llaves let no es entendido
   {
	let ciudad="CABA";
   } 
   	console.log(ciudad);  // código que no se ejecuta 
  
 /* ---  Aplicando const --- */
 
 const nacimiento= 1980;
 console.log(nacimiento);
 
 nacimiento= 1960;  // Si quiero suplantar la constante por un nuevo dato, no se podrá.
 

 
 /*

Antes de ingresar al concepto de "condicional" es importante tener en cuenta los tipos de datos booleanos ya que a través de ciertos operadores que usarás en el condicional devolverá un valor "true" o "false". 
 
  OPERADORES DE COMPARACIÓN
      mayor que         -->     100>10
      menor que         -->     10 < 100
      menor igual       -->     10 <= 100
      mayor igual       -->     100 >= 10
      igual que         -->     10 == 10
      totalmente igual  -->     10 === 10
      distinto de       -->     100 != 10


      OPERADORES LÓGICOS
    
        &&  --> and 
        ||  --> or
        !   --> not


Por otro lado también tene en cuenta que los string y los números positivos darán un valor "true" pero el cero, null, undefined y NaN devuelven un valor "false". 
Verificar en la consola haciendo:

  True:

        !!"probando"

        !!20  

  False:

        !!0
        !!null
        !!undefined
        !!NaN

*/


/*  

  CONDICIONAL IF, ELSE

      if (condición){
        instrucciones si se da la condición.

      } else {
        instrucciones si no se da la condición.
      }

*/


// EJEMPLO: (Usando operadores de comparación)

var edad= parseInt(prompt("Ingresa edad"));
var nombre=prompt("Ingresa tu nombre");

if(edad >= 18) {
  console.log("Bienvenido/a. " + nombre);
}
else {
  console.log("No podes ingresar.");
}


// Operador condicional (ternario)

var edad= parseInt(prompt("Ingresa edad"));
var nombre= prompt("Ingresa tu nombre");

edad>=18 ? console.log("Bienvenido/a." + nombre) : console.log("No podes ingresar.");

/* 



CONDICIONAL IF, ELSE IF y ELSE (Donde tenemos dos condiciones verdaderas)


  if (condición){
    instrucciones si se da la condición


	 }
   else if (condición) {
	   
   }

  else {
    instrucciones si no se da la condición.
  }

*/


/* 
Si tenes 18 años o más y si sos de nacionalidad argentina podrás ingresar al sistema. 
También puede ingresar Juan , el adminitrador, sin importar la edad que tenga ni su nacionalidad

*/


  var edad = parseInt(prompt("Decime tu edad"));
  var nacionalidad= prompt("Decime tu nacionalidad").toLowerCase();
  var admin=prompt("¿Cómo es tu nombre?").toLowerCase();

  if(edad >= 18 && nacionalidad == "argentina" ) {

    alert("Podes ingresar por ser mayor de edad o por ser de Argentina");
  }

  else if(admin == "juan"){
	 alert("Bienvenido " + admin);
	 }

  else {
	 alert("No cumplis con los requisitos solicitados");
  }

  // ejercicios
  //name, age, gender, isMember, thirsty y drinkName.

  var name, age, gender, isMember, thirsty, drinkName;
  name = prompt("¿Cuál es tu nombre?");
  age = parseInt(prompt("¿Qué edad tienes?"));
  gender = prompt("¿Cuál es tu genero (masculino o femenino)?").toLowerCase;
  isMember = prompt("¿Eres miembro? (Si o No)").toLowerCase;
//  thirsty = true;
//  drinkName = prompt("¿Qué deseas tomar?");

  if (gender == "femenino") {
      gender = "Señora"
  } else { gender = "Señor" }

  if ((isMember == "no") || (age < 21)) {
      alert(gender + ", por favor, no podrán acceder a nuestro selecto club. Que tengan buenas noches.")
  } else  {
    thirsty = prompt("Excelente " + gender + " " + name + ". " + "¿Se encuentra sediento esta noche?").toLowerCase
    if (thirsty == "si") {drinkName = prompt("¿Qué deseas tomar?").toLowerCase;}
    if (drinkName != "descafeinado") {alert("Sí ") + name + " un " + drinkName + " viniendo!"} else {alert("Por favor, retirense, no servimos eso")}
  }
//   Si no son un miembro o si son menores de 21 años, dirígete a ellos como señor o señora, según corresponda y en tono de disculpa niégales el acceso al club.
// Si no, saludalos como el señor o la señora (en su caso por género) y su nombre, y dales la bienvenida. Si tienen sed, pregúntale la bebida que les gustaría tomar.
// Si su bebida favorita es cualquier cosa menos "Café Descafeinado", dice "sí" name "un" drinkName "viniendo!".
// Si piden un descafeinado, echalos del bar.

// if (condition) { 
// } else {
// }

