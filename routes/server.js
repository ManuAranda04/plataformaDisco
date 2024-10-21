const express = require('express')

const router = express.Router()

//RUTAS
router.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = router