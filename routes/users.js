const express = require('express')
const Users = require('../models/User')
const router = express.Router();
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = process.env.SALT_ROUNDS;
const secret = process.env.JWTSECRET;

const hashPassword = async(pass)=>{
    return bcrypt.hash(pass, parseInt(saltRounds));
};

router.post('/', async (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    try {
        const contrasenaHasheada = await hashPassword(password);
        const newUser = new Users({
            nombre,
            apellido,
            email,
            password: contrasenaHasheada,
        });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al registrar el usuario', details: error.message });
    }
});

router.post('/login', async (req, res)=>{
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({email});
        if(!user){
            return res.status(404).json({error:'Usuario no encontrado'});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(401).json({error:'Contraseña incorrecta'});
        }

        const token = jwt.sign({id: user._id}, secret, { expiresIn:"48h"})
        res.status(200).json({message:'Inicio de sesión exitoso', token });
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Error en el inicio de sesión', error});
    }
});

module.exports = router