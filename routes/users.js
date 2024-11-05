const express = require('express')
const Users = require('../models/User')
const router = express.Router()

router.get('/:id', async (req, res)=>{
    try {
        const usuarios = await Users.findById(req.params.id);
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

router.post('/', async (req, res)=>{
    try {
        console.log(req.body);
        const newUser = new Users(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router