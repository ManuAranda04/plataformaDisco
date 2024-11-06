//Backend
async function crearUsuario(event) {
    event.preventDefault();

    try {
        const nombre = document.querySelector("#nombre").value;
        const apellido = document.querySelector("#apellido").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const response = await axios.post("http://localhost:3000/usuarios/login", {
            nombre,
            apellido,
            email,
            password,
        });

        swal("Felicidades", "Su usario ha sido creado correctamente", "success").then(()=>{
            window.location.href = "index.html";
        });
    }catch(error) {
        swal("Lo sentimos!", "Su usario no ha podido ser creado", "error")
        console.error(error.response?.data || error.message);
    }
}

document.querySelector(".enviarUser").addEventListener("click",crearUsuario);