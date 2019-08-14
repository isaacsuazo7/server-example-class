
//-----------------------------------------------------------------------------------------
const express = require('express');
const Usuario = require('../models/usuario');
const app = express();
const mongoose = require('mongoose')

app.get('/', (req, res) =>{
    res.json('Hola Mundo')
});

app.get('/usuario/:id', (req, res) =>{
    let id = req.params.id

    Usuario.findById(id,(err,usuario)=>{
        if(err) res.status(500).send({message:`Error al realizar peticion ${err}`})
        if(!usuario) res.status(404).send({message:'El usuario no existe'})

        res.status(200).send({usuario})
    })
});

app.post('/usuario', (req, res) =>{
    let body = req.body;

    let usuario = new Usuario({//crea nueva instancia del esquema usuario
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role,
        google: body.google
    });

    //Grabar en la DB
    usuario.save( (err, usuarioDB) =>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            usuario: usuarioDB
        })
    });
});

app.put('/usuario/:id', (req, res) =>{
    let id = req.params.id;
    let body = req.body;

    //traer el usuario que solicitamos de acuerdo al id
    Usuario.findByIdAndUpdate(id, body, {new: true}, (err, usuarioDB) =>{
        if(err){
            req.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario', (reqp, res) =>{
    res.json('delete usuario');
})
module.exports = app;   