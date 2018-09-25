var express = require('express');
var router = express.Router();
const unVoto = require('../models/votos'); //uso el esquema que definí en el modelo de datos para cuando está por votar la persona
var Partido = require('../models/partidos');

// Pagina principal
router.get('/', (req, res) => {
    res.render('index');
});

// Esto lleva a la página con las estadísticas
// router.get('/estadisticas',  (req, res) => {
//     res.render('estadisticas');
// })

router.get('/estadisticas', async (req, res) => {
    const partidos = await Partido.find().sort({numeroPartido: 1});
    res.render('estadisticas', {
        partidos
    });
})

// Esto lleva a la página para votar: quiero que liste los partidos de la colección partidos
router.get('/votar', async (req, res) => {
    const partidos = await Partido.find();
    res.render('votar', {
        partidos //partidos: partidos
    });
});

// sumando un voto
router.post('/sumar', async (req, res) => {
    //console.log(req.body);
    //console.log(new unVoto(req.body));
    const nuevoVoto = new unVoto(req.body);
    await nuevoVoto.save();
    //res.send('recibido');
    res.redirect('/estadisticas');
});

module.exports = router;