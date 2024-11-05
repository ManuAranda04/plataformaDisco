const express = require("express")
const mongoose = require('mongoose')
const router = require('./routes/server')
const Albumes = require('./models/Album')
const Users = require('./models/User')
const url = 'mongodb+srv://manuivan2004:pGnT5f2we0LyITto@plataformadisco.a5kht.mongodb.net/?retryWrites=true&w=majority&appName=plataformaDisco'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use(express.static(path.join(__dirname, "./public")));

app.use('/', router)

const connectToMongo = async ()=>{
  try {
    await mongoose.connect(url)

    app.listen(3000, () => {
      console.log("Servidor escuchando en el puerto 3000 y DB conectado");
    });
  }catch (error) {
    console.log(error)
  }
}

connectToMongo()