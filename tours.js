/* Tours */
function saludarTours(){
    let nombre;
    let span = document.getElementById("welcome");
    let i = document.querySelector("i");

    nombre = prompt("Cuál es tu nombre?");
    while (nombre.length < 3){
        nombre = prompt("Ingrese un nombre valido(al menos 3 letras)");
    }
    
    span.textContent = `Bienvenido, ${nombre}! ¿Querés adquirir tickets?`;
    i.setAttribute("class", "fa-solid fa-ticket");
    i.setAttribute("style", "color: #ffffff");
}

/* Tickets */
function getTickets(button){
    let tickets;
    if(button.innerText.includes("No hay tickets")){
        tickets = false;
    }
    else {
        tickets = true;
    }

    let place = button.previousElementSibling.textContent;

    let date = button.previousElementSibling.previousElementSibling.textContent;

    if(tickets){
        swal("Felicidades!", `Has adquirido tickets para el concierto en ${place} el ${date}`, "success");
    }
    else {
        swal("Lo sentimos!", `No hay tickets disponibles para el concierto en ${place} para el ${date}`, "info");
    }
}