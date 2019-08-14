//archivo para iniciar el servidor
require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

//parse application/x-www-from-urlencode
app.use(bodyParser.urlencoded({ extended: false}));

//parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

//conectar a la DB
mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true}, (err, resp) =>{
    if(err) throw err; //si hay error, que lo muestre

    console.log('Base de datos online');
});

app.listen(process.env.PORT, () =>{
    console.log('Escuchando puerto: ', process.env.PORT);
});