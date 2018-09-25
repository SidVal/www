// $(document).ready(function() 
// puede ser reemplazado por 
// $(funcion()
//
// Quedaría:

$(function() {
    console.log("Jq está cargado");
//     $(window).on("scroll",function(){
//         if ($(this).scrollTop() + $(this).innerHeight()>=$('html').innerHeight()-1 {
//             alert("Llegaste al final");
//         }) 
//     })
// 
})

function ocultar(){
    $(".cuadrado").toggleClass("hidden");
    var parrafo = $(".cuadrado").has("p");
    parrafo.css({
        "border-color":"red",
        "color":"red"
    })


    parrafo.attr("data","elemento1");
    // parrafo.attr("onclick","alert('click');");
    
    var dato = parrafo.attr("data");

    //mover elemento al final del contenedor source, lo quiero dentro del destino
    //parrafo.appendTo($(".destino"));

    parrafo.attr("onclick","volver(this);")

    //$($(".cuadrado")[2]).appendTo($(".destino"));
    //$($(".cuadrado")[3]).prependTo($(".destino"));

    
}
    
function volver(element) {
    $(element).appendTo($(".source"));
}
