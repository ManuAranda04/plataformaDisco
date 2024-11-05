const mongoose = require('mongoose');

//TITULO, DESCRIPCION, AÑO, CANCIONES, PORTADA
const Cancion = new mongoose.Schema({
    nombre:{
        type:String,
        required: true
    }, 
    duracion:{
        type:Number,
        required: true
    },
    enlace:{
        type:String,
        required: true
    }
})

const Albumes = new mongoose.Schema({
    titulo:{
        type:String,
        required: true
    },
    anio:{
        type:Date,
        required: true
    },
    descripcion:{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 400
    },
    portada:{
        type:String,
        required: true
    },
    canciones:[Cancion]
})

module.exports = mongoose.model('Albumes', Albumes)