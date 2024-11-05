//Backend
async function obtenerUsuario(id) {
    try {
        const response = await axios.get("http://localhost:3000/usuarios/");
        console.log(response);
    } catch (error) {
        console.log(error);
    }    
}

//obtenerAlbum(id);

//Crear usuario
async function crearUsuario() {
    event.preventDefault();

    try {
        const nombre = document.querySelector("#nombre");
        const apellido = document.querySelector("#apellido");
        const email = document.querySelector("#email");
        const password = document.querySelector("#password");

        const response = await axios.post("http://localhost:3000/usuarios/",{
            nombre:nombre.value,
            apellido:apellido.value,
            email:email.value,
            password:password.value,
        });
        console.log(response);        
    } catch (error) {
        console.log(error);
    }
}

document.querySelector(".enviarUser").addEventListener("click",crearUsuario)