const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const router = require('./routes/server')
const Albumes = require('./models/Album')
const Users = require('./models/User')
const url = process.env.DATABASE_URL
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use(express.static(path.join(__dirname, "./public")));

app.use('/', router)

const connectToMongo = async ()=>{
  try {
    await mongoose.connect(url)

    app.listen(PORT, () => {
      console.log("Servidor escuchando en el puerto 3000 y DB conectado");
    });
  }catch (error) {
    console.log(error)
  }
}

connectToMongo()