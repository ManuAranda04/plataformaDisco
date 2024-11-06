const mongoose = require('mongoose');
const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

//TITULO, DESCRIPCION AÑO CANCIONES PORTADA

const Users = new mongoose.Schema({
    nombre:{
        type:String,
        required: true,
        minlength: 2
    },
    apellido:{
        type:String,
        required: true,
        minlength: 2
    },
    email:{type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v){
                return regex.test(v);
            },
            message: 'Debes ingresar un correo valido'
        }
    },
    password:{
        type:String,
        required: true
    },
    favourites:[{ id:{type:mongoose.Schema.Types.ObjectId}, titulo:{type:String}}]
});

module.exports = mongoose.model('Users', Users)