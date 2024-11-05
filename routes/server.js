const express = require('express')
const Albumes = require('../models/Album')
const router = express.Router()

const albums = require('./albumes')
const usuarios = require('./users')

router.use('/albums', albums)
router.use('/usuarios', usuarios)

module.exports = router