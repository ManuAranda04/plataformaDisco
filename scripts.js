/* Menu hamburguesa */
let menu = document.getElementById('menu');

/* Tours */
function saludarTours(){
    let nombre;
    let edad;
    let span = document.getElementById("welcome");

    nombre = prompt("Cuál es tu nombre?").toUpperCase();
    while (nombre.length < 3){
        nombre = prompt("Ingrese un nombre valido(al menos 3 letras)").toUpperCase();
    }
    
    span.textContent = `Hola, ${nombre}!`;
}

function abrirMenu(){
    if(menu.classList.contains('hidden')){
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}