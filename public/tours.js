/* Tours */
let nombre = prompt("Cuál es tu nombre?");
let edad = prompt("Cuál es tu edad?");
let span = document.getElementById("welcome");
let i = document.querySelector("i");
let botonTickets = document.querySelectorAll("#ticketButton")

function saludarTours(){
    while (nombre.length < 3){
        nombre = prompt("Ingrese un nombre valido(al menos 3 letras)");
    }

    while(isNaN(edad)){
        edad = prompt("Ingrese una edad valida(sólo debe contener números)")
    }

    if(edad < 18){
        swal("Lo sentimos!", "No cuentas con la edad suficiente para comprar tickets.", "info");
        
        span.textContent = `Bienvenido, ${nombre} de ${edad} años! Lamentablemente no cuentas con la edad suficiente para comprar tickets`;

        for (let i = 0; i < botonTickets.length; i++) {
            botonTickets[i].textContent = "Lo sentimos! Eres menor de edad";
            botonTickets[i].classList.remove('bg-zinc-950');
            botonTickets[i].classList.add('bg-red-700');
        }
    }
    else{
        span.textContent = `Bienvenido, ${nombre} de ${edad} años! ¿Querés adquirir tickets?`;
        i.setAttribute("class", "fa-solid fa-ticket");
        i.setAttribute("style", "color: #ffffff");
    }
}

/* Tickets */
function getTickets(button){
    if(edad < 18){
        if (button.innerText.includes("Lo sentimos! Eres menor de edad")) {
            swal("Error!", "No cuentas con edad suficiente para esta acción.", "info");
        }
    }
    else{
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
}