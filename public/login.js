let form = document.getElementById("formLogin");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let passwordWarning = document.getElementById("passwordWarning");

passwordInput.addEventListener("input", function () {
  let passwordLenght = passwordInput.value.length;

  if (passwordLenght < 6) {
    passwordWarning.style.display = "block";
  } else {
    passwordWarning.style.display = "none";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let emailValue = emailInput.value;
  let passwordValue = passwordInput.value;

  if (emailValue === "" || passwordValue === "") {
    swal("Error", "Por favor, completa todos los campos.", "error");
  } else if (passwordValue.length < 6) {
    swal("Error", "La contraseña debe tener al menos 6 caracteres.", "error");
  } else {
    swal(
      "Felicidades!",
      "Su formulario se ha enviado correctamente!",
      "success"
    );
  }
});
