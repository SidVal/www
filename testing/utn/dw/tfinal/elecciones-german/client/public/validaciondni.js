//validando campos
document.getElementById("name").onchange = function() { validar() };
document.getElementById("DNI").onchange = function() {validar()};
document.getElementById("genero").onchange = function() {validar()};



function validar() {
  var nom = document.getElementById('name');
  var doc = document.getElementById('DNI');
  var gen = document.getElementById('genero');
  var v = document.getElementById("validar");
  
  
if (nom.checkValidity() && doc.checkValidity() && gen.checkValidity()) { 
  v.classList.remove('disabled')
  } else { v.classList.add('disabled') }
}


//función para enviar los datos a localstorage
  function EnviarDNI() {
        var dni = document.getElementById("DNI").value;
       
        console.log(dni);
        localStorage.setItem("DNI1", dni);   
    }


    //función para validar el DNI
    function validarDNI() {
      var doc = document.getElementById('DNI').value; //traemos el número de documento del id DNI
      var c = document.getElementById("continuar");
      var v = document.getElementById("validar");
      $.ajax({
      url: '/api/votante/validar/' + doc, //colocamos el número al final del validador en la api
      method: "GET",
      type: "JSON",
      success: function(resp) { //si trae datos, validamos
        if (resp.length != 0) { //si los datos que trae son distintos a cero:
          alert('Su documento ya registra un voto. Solo se permite un voto por ciudadano'); //enviamos el alert 
          document.location.reload(); //y recargamos la página, para que el tipo tenga que empezar de cero.
        } else { //si no son cero, es decir, el resultado que trae el api tiene datos, entonces:
          //document.location.href = "/votacion" // redireccionamos al usuario a la página de votación
          alert('Todos los datos son válidos, por favor, haga clic en continuar para seleccionar su candidato');
          $('#continuar').attr('disabled', false);
          v.classList.remove('disabled');
          c.classList.remove('disabled');
          $('#validar').attr('disabled', true);
          };
      },
      error: function(jqXHR, status, error) {
        alert('Hubo un error: ' + jqXHR + '-' + error);
        console.log("Error: " + error); }
      });
      }



























































//$(function(){
  //$('#comparar').on('click', function(e){
 //   e.preventDefault();
 // })

//$.ajax({
 // type: 'POST',
//url:"auhorized/votacion.html",
 //data: ('dni'= dni),
       
        
 //  success: function(resp){
  //   if (resp !=null)
 //  alert("DNI repetido");
//}
//})
//});

//$(function(){
 // $('#comparar').on('click', function(e){
//__dni = ($("#DNI").val());

 //   $.ajax({
  //    type: "GET",
  //    url: "/votacion",
  //    success: function(response){

   //   },
   //   error: function(jqXHR, status, error) {
  //      alert("DNI Repetido",);
  //    }
  //  })
 // })
//})
//dnivotante = __dni;




//$(function(){
 // $('#comparar').on('click', function(e){
 //   $.ajax({
 //         url:"auhorized/votacion.html" + dni,
 //         type: "GET",
  //        dataType: "json",
  //        data: ('dni'= dni),
  //        success: function(resp) {
  //            if (resp !=null)
  //            alert("DNI repetido");
  //         else { 
  //    localstorage.setItem("dni", dni);
 //     location.pathname = "/votacion" + dni;
//localStorage.getItem("dni", "");
  //  } 
 //   },
  //  error: function(jqXHR, status, error) {
   //    console.log("Error: " + error);
  //  }
  //  });
   // e.preventDefault();
 // });


