async function crearAlbum() {
    event.preventDefault();

    try {
        const titulo = document.querySelector("#titulo");
        const anio = document.querySelector("#anio");
        const descripcion = document.querySelector("#descripcion");
        const portada = document.querySelector("#portada");
        const nombreCancion = document.querySelector("#nombreCancion");
        const duracionCancion = document.querySelector("#duracionCancion");
        const enlaceCancion = document.querySelector("#enlaceCancion");

        const response = await axios.post("http://localhost:3000/albums/",{
            titulo:titulo.value,
            anio:anio.value,
            descripcion:descripcion.value,
            portada:portada.value,
            canciones:[
                {
                    nombre:nombreCancion.value,
                    duracion:duracionCancion.value,
                    enlace:enlaceCancion.value
                }
        ],
        });
        console.log(response);
        window.location.href = "index.html";
    }catch(error) {
        alert("Error al crear el album!")
        if (error.response) {
            console.log("Server response data:", error.response.data);
        }
        console.log(error);
    }
}

document.querySelector(".enviarAlbum").addEventListener("click",crearAlbum);

async function buscarAlbumes() {
    try {
        let response = await axios.get("http://localhost:3000/albums/")
        response.data.forEach(album => mostrarAlbum(album));
    }catch(error) {
        console.log(error);
    }    
}

buscarAlbumes();

async function mostrarAlbum(album){
    try {
        let albumContainer = document.querySelector(".albumContainer");
        let nuevoAlbum = document.createElement("div");
        nuevoAlbum.classList.add("p-6", "md:mx-32", "my-8", "md:my-0", "bg-zinc-800", "relative", "claseAlbum");
        nuevoAlbum.setAttribute("data-id", album._id);

        const anioFormateado = new Date(album.anio).toLocaleDateString("en-GB");

        let listaCanciones = '';
        album.canciones.forEach(cancion =>{
            listaCanciones += `
                <li class="cancionAlbum flex justify-between items-center p-2 bg-zinc-900 rounded-md" data-song-id="${cancion._id}">
                    <div class="flex items-center space-x-4">
                        <span class="text-sm">${cancion.nombre}</span>
                        <span class="text-sm">${cancion.duracion}</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button class="editarCancionBtn" onclick="editarCancion('${album._id}', '${cancion._id}', '${cancion.nombre}', '${cancion.duracion}', '${cancion.enlace}')">
                            <i class="fa-regular fa-pen-to-square w-full h-full" style="color: #ffffff;"></i>
                        </button>
                        <a href="${cancion.enlace}">
                            <i class="fa-brands fa-itunes-note w-full h-full" style="color: #ffffff;"></i>
                        </a>
                        <button class="w-6 h-6 borrarCancion" onclick="borrarCancion('${album._id}', '${cancion._id}')">
                            <i class="fa-solid fa-trash w-full h-full" style="color: #ffffff;"></i>
                        </button>
                    </div>
                </li>`;
        });

        nuevoAlbum.innerHTML = `
            <img class="w-full md:h-64 md:w-64 hover:scale-90 mx-auto" src="${album.portada}" alt="${album.titulo}">
            <button class="favoriteButton absolute top-2 right-2 flex justify-between mb-2">
            <i class="fa-regular fa-star favoriteIcon"></i>
            </button>
            <h2 class="text-3xl mt-4 mb-1">${album.titulo}</h2>
            <h3>Año de lanzamiento: ${anioFormateado}</h3>
            <p class="mt-2 mb-2">${album.descripcion}</p>

            <h2 class="mt-4 mb-2 text-lg">Lista de Canciones</h2>
            <ul class="space-y-2">
                ${listaCanciones}
            </ul>

            <div class="p-2 mt-2 flex justify-between">
                <a href="addSong.html?albumId=${album._id}"><button class="addSongBtn p-2 rounded border-solid border-2 bg-zinc-950 hover:bg-zinc-50 hover:text-black hover:duration-300 hover:border-black">Agregar Canción</button></a>
                <button class="deleteBtn p-2 rounded border-solid border-2 bg-zinc-950 hover:bg-zinc-50 hover:text-black hover:duration-300 hover:border-black" onclick="borrarAlbum('${album._id}')">Borrar Album</button>
                <button class="editBtn p-2 rounded border-solid border-2 bg-zinc-950 hover:bg-zinc-50 hover:text-black hover:duration-300 hover:border-black" onclick="editarAlbum('${album._id}', '${album.titulo}', '${album.anio}' ,'${album.descripcion}', '${album.portada}')">Editar Album</button>
            </div>
        `;

        albumContainer.appendChild(nuevoAlbum);
    }catch(error){
        console.log(error)
    }
}

async function borrarAlbum(albumId) {
    const estasSeguro = confirm("Seguro que quieres borrar este album?");
    if(!estasSeguro){
        return;
    }

    try {
        await axios.delete(`http://localhost:3000/albums/${albumId}`);
        document.querySelector(`.albumContainer .album[data-id="${albumId}"]`).remove();
        alert("Album eliminado correctamente")
        location.reload();
    }catch(error){
        console.log(error);
    }    
}

function editarAlbum(id, titulo, anio, descripcion, portada) {
    let botonEditar = document.querySelector(".editBtn");
    botonEditar.classList.remove("bg-zinc-950", "hover:bg-zinc-50", "hover:text-black", "hover:duration-300", "hover:border-black");
    botonEditar.classList.add("bg-zinc-50", "text-black")
    botonEditar.disabled = true;

    let albumAEditar = document.querySelector(`[data-id='${id}']`);
    let editarAlbumForm = document.createElement("div");
    editarAlbumForm.classList.add("editAlbumDiv", "p-2", "mt-2");

    editarAlbumForm.innerHTML = `
        <form id="editAlbumForm">
            <label class="formLabel"> Editar Titulo:
                <input class="formInput bg-zinc-800 text-white" type="text" id="editarTitulo" value="${titulo}">
            </label>
            <label class="formLabel"> Editar Fecha de Lanzamiento:
                <input class="formInput bg-zinc-800 text-white" type="date" id="editarFecha" value="${anio}">
            </label>
            <label class="formLabel">Editar Descripción:
                <textarea class="text-black" id="editarDescripcion" minlength="5" maxlength="400">${descripcion}</textarea>
            </label>
            <label class="formLabel">Editar Portada(URL):
                <input class="formInput bg-zinc-800 text-white" type="text" id="editarPortada" value="${portada}">
            </label>
            <div class="flex justify-center">
                <button class="mx-2 px-2 rounded border-solid border-2 bg-zinc-950 hover:bg-zinc-50 hover:text-black hover:duration-300 hover:border-black" type="submit">Guardar</button>
                <button class="mx-2 px-2 rounded border-solid border-2 bg-zinc-950 hover:bg-zinc-50 hover:text-black hover:duration-300 hover:border-black" type="button" onclick="cancelarEdit('${id}')">Cancelar</button>
            </div>
        </form>
    `;

    albumAEditar.appendChild(editarAlbumForm);

    let editarForm = document.getElementById("editAlbumForm");
    editarForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await actualizarAlbum(id);
    });
}

async function actualizarAlbum(id) {
    try {
        const titulo = document.querySelector("#editarTitulo").value;
        const anio = document.querySelector("#editarFecha").value;
        const descripcion = document.querySelector("#editarDescripcion").value;
        const portada = document.querySelector("#editarPortada").value;

        const actualizarInfo = {}

        if(titulo) actualizarInfo.titulo = titulo;
        if(anio) actualizarInfo.anio = new Date(anio);
        if(descripcion) actualizarInfo.descripcion = descripcion;
        if(portada) actualizarInfo.portada = portada;

        const response = await axios.put(`http://localhost:3000/albums/${id}`, actualizarInfo)

        mostrarAlbum(response.data);
    }catch(error) {
        console.error(error);
    }
}

async function cancelarEdit(id){
    let editarAlbumForm = document.querySelector(".editAlbumDiv");
    let botonEditar = document.querySelector(".editBtn");
    botonEditar.disabled = false;
    botonEditar.classList.remove("bg-zinc-50", "text-black")
    botonEditar.classList.add("bg-zinc-950", "hover:bg-zinc-50", "hover:text-black", "hover:duration-300", "hover:border-black");
    try {
        editarAlbumForm.remove();
    } catch (error) {
       console.log(error); 
    }
}