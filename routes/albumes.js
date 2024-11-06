const express = require('express')
const Albumes = require('../models/Album');
const router = express.Router()

//Obtener albumes
router.get('/', async (req, res)=>{
    try {
        const albumes = await Albumes.find();
        res.status(200).json(albumes);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

//Obtener albumes pero por ID
router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const album = await Albumes.findById(id);
        if(!album){
            return res.status(404).json({message: 'Album no encontrado'});
        }
        res.json(album);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}) 

//Crear album en la database
router.post('/', async (req, res)=>{
    try {
        const album = new Albumes(req.body);
        await album.save();
        res.status(201).send(album);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

//Borrar album
router.delete('/:id', async (req, res) =>{
    try {
        let albumId = req.params.id;
        await Albumes.findByIdAndDelete(albumId);
        res.status(204).send()
    } catch(error){
        console.log(error)
        res.status(500).json({ error: 'Error al borrar el album' })
    }
})

//Actualizar album
router.put('/:id', async (req, res) =>{
    const id = req.params.id;
    try {
        const actualizarAlbum = await Albumes.findByIdAndUpdate(id, req.body, {new: true});
        if(!actualizarAlbum){
            return res.status(404).json({message: 'No se ha encontrado el album'})
        }
        res.json(actualizarAlbum)
        console.log(actualizarAlbum)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Agregar canciones
router.post('/:id/canciones', async (req, res)=>{
    const albumId = req.params.id;
    const nombre = req.body.nombre;
    const duracion = req.body.duracion;
    const enlace = req.body.enlace;

    try{
        const album = await Albumes.findByIdAndUpdate(
            albumId,
            {
                $push: { canciones: { nombre, duracion, enlace } }
            },
            { new: true }
        );

        if(!album){
            return res.status(404).json({error: "Album no encontrado"});
        }
        res.status(200).json(album);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Error al agregar canción' });
    }
})

//Borrar cancion
router.delete('/:id/canciones/:cancionId', async (req, res)=>{
    const albumId = req.params.id;
    const cancionId = req.params.cancionId;

    try {
        const album = await Albumes.findByIdAndUpdate(
            albumId,
            { $pull: { canciones: { _id: cancionId }}},
            { new: true }
        );

        if(!album){
            return res.status(404).send("Album no encontrado");
        }
        res.status(200).json(album);
    }catch(error) {
        res.status(500).json({ error: 'Error al eliminar canción' });
    }
})

//Actualizar canción
router.put('/:id/canciones/:cancionId', async (req, res) => {
    const albumId = req.params.id;
    const cancionId = req.params.cancionId;
    const { nombre, duracion, enlace } = req.body.cancion;

    try {
        const album = await Albumes.findById(albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album no encontrado' });
        }

        const cancion = album.canciones.id(cancionId);
        if (!cancion) {
            return res.status(404).json({ message: 'Cancion no encontrada' });
        }

        // Update each field
        cancion.nombre = nombre;
        cancion.duracion = Number(duracion); // Ensure `duracion` is a number
        cancion.enlace = enlace;

        await album.save();
        console.log(req.body.cancion);
        res.json({ message: 'Cancion actualizada correctamente' });
    } catch (error) {
        console.log(req.body.cancion);
        console.log(error);
        res.status(500).json({ message: 'Error al editar canción.' });
    }
});

//JIIIIIII JOOOOO JUUUUUUUUUU
//KJJJJJJJJJJ

module.exports = router