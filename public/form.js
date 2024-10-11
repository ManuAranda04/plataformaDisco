let formContainer = document.getElementById("formContainer");

//Crear el form
let form = document.createElement("form");
form.setAttribute("id", "userForm");
//Agregarlo al div
formContainer.appendChild(form);

//Nombre y Apellido
let nombreLabel = document.createElement("label");
let nombreInput = document.createElement("input");
nombreLabel.textContent = "Nombre y appellido:"; //Contenido del label
nombreInput.type = "text"; //Tipo de input
nombreInput.required = true; //Agrega la propiedad required
form.appendChild(nombreLabel); //Agregar label al form
form.appendChild(nombreInput); //Agregar input al form
form.appendChild(document.createElement("br")); //Agrega espacio entre cada label

//Email
let emailLabel = document.createElement("label");
let emailInput = document.createElement("input");
emailLabel.textContent = "Correo electronico";
emailInput.type = "email";
emailInput.placeholder = "tucorreoelectronico@gmail.com"; //Agrega place holder
emailInput.required = true;
form.append(emailLabel);
form.append(emailInput);
form.appendChild(document.createElement("br")); //Agrega espacio entre cada label

//Genero
let generosLabel = document.createElement("label");
let generos = ["Femenino", "Masculino", "No binario", "Prefiero no decirlo"]; //Opciones de género
generosLabel.textContent = "Género:";
form.appendChild(generosLabel);
generos.forEach((genero) => {
  let radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.name = "gender";
  radioInput.value = genero;
  form.appendChild(radioInput);
  form.appendChild(document.createTextNode(genero)); //Agrega los labels a cada opcion, sin esto solo sale el circulo a marcar
});
form.appendChild(document.createElement("br")); //Agrega espacio entre cada label

//Edad
let edadLabel = document.createElement("label");
edadLabel.textContent = "Rango de edad:";
form.appendChild(edadLabel);
let seleccionarEdad = document.createElement("select");
let rangoEdades = [
  "Menor a 18 años",
  "19-30 años",
  "31-45 años",
  "46-55 años",
  "Mayor a 56 años",
]; //Contiene todas las opciones
rangoEdades.forEach((rango) => {
  //Por cada elemento del array, crea una opción para ese elemento
  let option = document.createElement("option");
  option.value = rango;
  option.textContent = rango;
  seleccionarEdad.appendChild(option); //Agrega las opciones dentro del input
});
form.appendChild(seleccionarEdad);
form.appendChild(document.createElement("br")); //Agrega espacio entre cada label

//Nacionalidad
let labelArgentina = document.createElement("label");
form.appendChild(labelArgentina); //Agregado arriba o de lo contrario queda debajo de los checkboxes
labelArgentina.textContent = "¿Eres argentino?";
let checkboxArgentina = document.createElement("input");
let yesLabel = document.createElement("label");
yesLabel.textContent = "Sí";
let noLabel = document.createElement("label"); //Realmente no es necesario agregar la opción de no, ya que de no seleccionar nada devuelve valor false, de todas maneras queda mas prolijo así
noLabel.textContent = "No";
let checkboxNotArgentina = document.createElement("input");
checkboxArgentina.type = "checkbox";
checkboxArgentina.value = "argentinian";
checkboxNotArgentina.type = "checkbox";
checkboxNotArgentina.value = "notArgentinian";
//Labels arriba de los checboxes para que quede mejor
form.appendChild(yesLabel);
form.appendChild(checkboxArgentina);
form.appendChild(noLabel);
form.appendChild(checkboxNotArgentina);

//Obtener datos por consola
function obtenerDatos() {
  const name = nombreInput.value; //.value toma los datos del input
  const email = emailInput.value;
  const gender = form.gender.value; // Obtener el valor del radio button seleccionado
  const ageRange = seleccionarEdad.value;
  const isArgentinian = checkboxArgentina.checked;

  // Mostrar los datos en la consola
  console.log("Nombre y Apellido:", name);
  console.log("E-mail:", email);
  console.log("Género:", gender);
  console.log("Rango de edad:", ageRange);
  console.log("¿Es argentino?:", isArgentinian);
}
