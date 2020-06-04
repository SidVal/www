let btnCarga = document.getElementById("cargar");
btnCarga.addEventListener("click",datos);

function datos(){
let id = document.querySelectorAll("#id");
let edad = document.querySelectorAll("#edad");
//let poder = document.querySelectorAll("#poder");


    fetch("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json")
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (respuesta) {
        //console.log(respuesta.members);
        // for (let hero of respuesta.members) {
        //     id.innerHTML = hero.secretIdentity;
        //     edad.innerHTML = hero.age;
        //     poder.innerHTML = hero.powers.length;
        // }
        
        for (let i = 0; i < id.length; i++) {
            console.log(respuesta["members"][i]); //notación distinta pero es lo mismo que con punto.
            id[i].textContent = respuesta["members"][i].name;
            edad[i].textContent = respuesta["members"][i].age;
        }

        // identificación de los ULs
            document.querySelector("#heroe1").innerHTML = `<li>${respuesta["members"][0].powers[0]}</li><li>${respuesta["members"][0].powers[1]}</li><li>${respuesta["members"][0].powers[2]}</li>` //plantillas literales (comillas francesas);
            document.querySelector("#heroe2").innerHTML = `<li>${respuesta["members"][1].powers[0]}</li><li>${respuesta["members"][1].powers[1]}</li><li>${respuesta["members"][1].powers[2]}</li>`
            document.querySelector("#heroe3").innerHTML= `<li>${respuesta["members"][2].powers[0]}</li><li>${respuesta["members"][2].powers[1]}</li><li>${respuesta["members"][2].powers[2]}</li><li>${respuesta["members"][2].powers[3]}</li><li>${respuesta["members"][2].powers[4]}</li><li>${respuesta["members"][2].powers[5]}</li>`


    })
    .catch(function (err) {
        console.log(err);
    });
}

