/*  
  Funciones: conjunto de instrucciones agrupadas que se podrá reutilizar tantas veces lo necesitemos en distintos puntos del programa. 


    function nombre_funcion(parametros){ // el parámetro es una variable local

      instrucciones;
    }
*/

// Sin parámetro 

function saludar(){
    console.log("Hola");
  }
  
  
  /* Con parámetros y argumentos 
  
    Parámetros: es la variable que se coloca en la definición de la función. Pueden recibir argumentos de cualquier tipo (números, string, etc)
  
    Argumentos: es el valor actual que se envía a la función. Los argumentos llenan a los parámetros. 
  */
  
  
  function suma(a,b){
    return a+b; 
  }
  
  console.log(suma(2,3));
  
  //otro ejemplo
  
  let saludarPersonas = function(persona1, persona2, persona3){
    console.log("hola "+persona1)
    console.log("hola "+persona2)
    console.log("hola "+persona3)
  }
  saludarPersonas("Harry", "Ron", "Hermione")
  
  
  // Return: se encarga de devolver el resultado de la función al ser ejecutada. A su vez con ella termina la ejecución de una función por ende si luego de un return hay más líneas de código entonces ellas nunca se ejecutarán. 
  
  
  /* SCOPE: ámbito 
    hay dos tipos de scope: 
      - Global Scope: está disponible en todas las partes del código y no es muy recomendado. 
      - Local Scope: se crea para cada función cuando ella se ejecuta. Todo lo que está ahi solo vive mientras se ejecuta la función que se está usando. Y es más recomendable ya que evitamos errores. */
  
  
    var nombre= "Pepe";
  
    function saludo() {
      var nombre="Juanita";
      console.log(nombre)
    }
  
    saludo();
    console.log(nombre)
  
    //Si inicializas una variable fuera, le das un valor dentro de la función y la retornas, el valor sera guardado en la variable
  
    var apellido;
    function retornoVariable (){
      apellido="Silva";
    return apellido;
    }
  
    
  
  // Funciones anónimas: el conjunto de instrucciones no tiene nombre y se puede guardar dentro de una variable
  
    var electrodomesticos = function (nombre){
      return "El electrodoméstico es: "+ nombre;
    }
  
  
  /* Arrow Function (función flecha)
  
    const nombreFuncion = (parametros) => {
      instrucciones de la función
      return valor 
    }
  
  */
  
  // 1er ejemplo: sin parámetro
  
  var saludo = () => {
    console.log("Hola");
  }
  
  
  
  // Cuando tenemos una sola línea de código, podemos evitar las llaves
  let saludos = () => console.log("Hola");
  
  
  
  // 2do ejemplo: pasando un parámetro
  var electrodomestico = nombre => {
    return "El electrodoméstico es: "+ nombre;
  }
  console.log(electrodomestico("Tv"));
  
  // 3er ejemplo: sin return
  
  var suma = (a,b) => a+b
  console.log(suma(3,6));
  