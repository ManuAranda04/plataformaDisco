async function agregarCancion() {
    let nombre = document.querySelector("#songName");
    let duracion = document.querySelector("#songDuration");
    let enlace = document.querySelector("#songLink");
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get("albumId");
    
    try {
        const response = await axios.post(`http://localhost:3000/albums/${albumId}/canciones`, {
            nombre:nombre.value,
            duracion:duracion.value,
            enlace:enlace.value
        });
        window.location.href = "index.html";
    }catch(error) {
        console.error("Error al agregar canción:", error);
        alert("Hubo un error al agregar la cancion. Por favor, intente nuevamente");
    }
}

document.querySelector(".agregarCancion").addEventListener("click",agregarCancion);

async function borrarCancion(albumId, cancionId) {
    const estasSeguro = confirm("Seguro que quieres borrar esta canción?");
    if (!estasSeguro) {
        return;
    }

    try {
        await axios.delete(`http://localhost:3000/albums/${albumId}/canciones/${cancionId}`);
        document.querySelector(`li[data-song-id="${cancionId}"]`).remove();
        alert("Cancion eliminada correctamente");
        location.reload();
    }catch(error) {
        alert("Error al borrar canción. Intente nuevamente.");
        console.log(error);
    }
}

async function editarCancion(albumId, cancionId, nombre, duracion, enlace) {
    try {
        const liCancion = document.querySelector(`[data-song-id="${cancionId}"]`);
        const editarCancionBtn = liCancion.querySelector(".editarCancionBtn");
        editarCancionBtn.disabled = true;

        const editarCancionForm = document.createElement("div");
        editarCancionForm.classList.add("editarCancionDiv", "p-2", "mt-2");
        editarCancionForm.innerHTML = `
            <form class="editCancionForm space-y-2 bg-zinc-800 p-2 rounded-md">
                <label class="formLabel">Editar Nombre
                    <input type="text" value="${nombre}" id="nombre" class="formInput bg-zinc-800 text-white" required>
                </label>
                <label class="formLabel">Editar Duración
                    <input type="number" value="${duracion}" id="duracion" class="formInput bg-zinc-800 text-white" required>
                </label>
                <label class="formLabel">Editar Enlace
                    <input type="string" value="${enlace}" id="enlace" class="formInput bg-zinc-800 text-white" required>
                </label>
                <div class="flex justify-between">
                    <button type="submit" class="guardarCancionBtn p-2 rounded border-solid border-2 bg-zinc-950 hover:bg-zinc-50 hover:text-black hover:duration-300 hover:border-black">Guardar</button>
                    <button class="p-2 rounded border-solid border-2 bg-zinc-950 hover:bg-zinc-50 hover:text-black hover:duration-300 hover:border-black" type="button" onclick="cancelarEditSng('${cancionId}')">Cancelar</button>
                </div>
            </form>
        `;

        liCancion.insertAdjacentElement('afterend', editarCancionForm);

        let cancionForm = document.querySelector(".editCancionForm");
        cancionForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            await actualizarCancion(albumId, cancionId);
        });
    }catch(error){
        alert("Error al editar canción. Por favor, intente nuevamente.");
        console.error("Error al crear el album", error);
    }
};

async function actualizarCancion(albumId, cancionId) {
    try {
        const nombre = document.querySelector("#nombre");
        const duracion = document.querySelector("#duracion");
        const enlace = document.querySelector("#enlace");
        
        const response = await axios.put(`http://localhost:3000/albums/${albumId}/canciones/${cancionId}`, {
            cancion: { nombre:nombre.value, duracion:duracion.value, enlace: enlace.value }
        });
        console.log(response.data);
        alert("Canción actualizada correctamente!");
    }catch(error){
        console.log(error);
    }
}

async function cancelarEditSng(cancionId){
    let editarCancionForm = document.querySelector(".editarCancionDiv");
    const liCancion = document.querySelector(`[data-song-id="${cancionId}"]`);
    let editarCancionBtn = liCancion.querySelector(".editarCancionBtn");
    editarCancionBtn.disabled = false;
    try {
        editarCancionForm.remove();
    }catch(error) {
       console.log(error); 
    }
}