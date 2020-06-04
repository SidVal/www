function crearElementos() {
    let contenedor = document.querySelector("#contenedor");

    let nuevo = document.createElement("div")
    nuevo.classList.add("pixel");
    
    contenedor.appendChild(nuevo);
    
}

function agregarElementos() {
for (let i=1; i<=2000;i++) {
    crearElementos();
}
}

agregarElementos();

let pixeles = document.querySelectorAll(".pixel");
for (let pixel of pixeles){
    pixel.addEventListener("mouseover",function(){
        this.classList.add("pintura")
    })
}