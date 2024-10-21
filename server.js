const express = require("express");
const router = require('./routes/server')

const app = express()

app.use('/', router)

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});