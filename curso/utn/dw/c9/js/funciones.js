$(function() {
    console.log("JQUERY esta cargado...");
    //Para bindear el evento scroll de mi pagina.
    $(window).on("scroll", function() {
        if ($(this).scrollTop() + $(this).innerHeight() >= $('html').innerHeight() - 1) {
            alert('llegaste el final del scroll...');
        }
    });

    //Para quitar el bindeo del evento scroll...
    //$(window).off("scroll");

});


var parrafo;

function ocultar() {
    //$(".cuadrado").toggleClass("hidden");
    //$(".cuadrado").has("p").toggleClass("hidden");
    //$(".cuadrado p").toggleClass("hidden");
    $(".cuadrado p").html("Hola <b>Mundo!</b>");
    var contenido = $(".cuadrado p").html();
    console.log(contenido);
    var texto = $(".cuadrado p").text();
    console.log(texto);
    $("input:text").val("se presiono el boton...");
    var contenido = $("input:text").val();
    console.log(contenido);

    //Asignacion a variable..
    parrafo = $(".cuadrado").has("p");
    //parrafo.css("border-color", "red");
    parrafo.css({
        "border-color": "red",
        "color": "red"
    });

    parrafo.attr("data", "elemento1");

    parrafo.attr("onclick", "volver(this);");

    var dato = parrafo.attr("data");
    console.log(dato);

    //Mover elemento al siguiente del contenedor...
    //parrafo.appendTo($(".container.destino"));

    //$($(".cuadrado")[3]).prependTo($(".container.destino"));

    //$(".container.destino").append($($(".cuadrado")[3]));

    //$(".container.destino").prepend($($(".cuadrado")[3]));

    //$($(".cuadrado")[3]).clone().appendTo($(".container.destino"));

    //$($(".cuadrado")[3]).clone().insertAfter($($(".cuadrado")[2]));

    $(".cuadrado").eq(3).clone().width("150px").height("150px").insertBefore($(".cuadrado").eq(2));

    //Generar elementos...
    var nuevoElement = $("<div/>", {
        'class': 'cuadrado',
        'html': '6 <p>div nuevo</p>',
        'css': {
            'fontSize': '18px',
            'color': 'blue'
        }
    });

    nuevoElement.appendTo($(".container.destino"));

    var pares = $.grep($(".cuadrado"), function(elemento, index) {
        if ((index % 2) == 0) {
            return elemento;
        }
    });

    $(pares).css("border-color", "rgb(255,0,0)");

    $(".cuadrado p").parent().css("border-color", "rgb(0,255,0)");
}

function volver(element) {
    //Para mover hacia otro contenedor...
    //$(element).appendTo($(".container.source"));
    //Para quitar el elemento del documento...
    $(element).remove();
}