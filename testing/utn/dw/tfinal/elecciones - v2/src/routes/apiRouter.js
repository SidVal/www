var express = require("express");
var apiRouter = express.Router();
var Votos = require('../models/votos'); //uso el esquema que definí en el modelo de datos para cuando está por votar la persona
var Partidos = require('../models/partidos');

//Api para validar documento y género. La tecnicatura en programación me enseñó que nuestro DNI puede estar repetido entre distintos géneros, es decir, el mismo DNI lo puede tener un hombre y una mujer.
apiRouter.get('/validar/:doc&:sex', async function(req, res, next) {
    var doc = req.params.doc;
    var sex = req.params.sex;
    //console.log(doc);
    //console.log(sex);
    const unvotoun = await Votos.find({ documentoPersona: doc, sexoPersona: sex});
    //res.jsonp(unvotoun);
    //console.log(unvotoun);
      if(unvotoun.length > 0 ) {
          console.log(unvotoun);
          res.jsonp(unvotoun);
          } else {
              console.log('No encontró registro');
              res.json('');
              //res.redirect('/votar');
          };
    //res.send('recibido');
});

// APIs para estadísticas

apiRouter.get('/stats', async (req, res) => {
    const total = await Votos.find().countDocuments();
    res.jsonp(total);
    //devuelve número de votos totales
});

apiRouter.get('/stats/:numeroPartido', async function(req, res, next) {
    const numPartido = req.params.numeroPartido;
    const porPartido = await Votos.find({numeroPartido: numPartido}).countDocuments(); 
    res.jsonp(porPartido);
    ///api/stats/2 devuelve la cantidad de votos que recibió, del total (/stats)
});


//la idea es que el api devuelva los porcentajes obtenidos por los partidos. //NO anda
apiRouter.get('/porcentajes', async (req, res) => {
    const P1 = await Votos.find({numeroPartido: 1}).countDocuments(); 
    const P2 = await Votos.find({numeroPartido: 2}).countDocuments(); 
    const P3 = await Votos.find({numeroPartido: 3}).countDocuments(); 
    const P4 = await Votos.find({numeroPartido: 4}).countDocuments(); 
    const P5 = await Votos.find({numeroPartido: 5}).countDocuments(); 
    const P6 = await Votos.find({numeroPartido: 6}).countDocuments(); 
    const P7 = await Votos.find({numeroPartido: 7}).countDocuments();
    const total = await Votos.find().countDocuments();
    const pp1 = ((P1 / total) * 100).toFixed(2);
    const pp2 = ((P2 / total) * 100).toFixed(2);
    const pp3 = ((P3 / total) * 100).toFixed(2);
    const pp4 = ((P4 / total) * 100).toFixed(2);
    const pp5 = ((P5 / total) * 100).toFixed(2);
    const pp6 = ((P6 / total) * 100).toFixed(2);
    const pp7 = ((P7 / total) * 100).toFixed(2);

    res.json('['+ pp1 + ',' + pp2 + ',' + pp3 + ',' + pp4 + ',' + pp5 + ',' + pp6 + ',' + pp7 + ']');
    //res.jsonp('[{Partido1: ' + ((P1/total)*100).toFixed(2) + '}, {Partido2: ' + ((P2/total)*100).toFixed(2) + '}, {Partido3: ' + ((P3/total)*100).toFixed(2) + '}, {Partido4: ' + ((P4/total)*100).toFixed(2) + '}, {Partido5: ' + ((P5/total)*100).toFixed(2) + '}, {Partido6: ' + ((P6/total)*100).toFixed(2) + '}, {Partido7: ' + ((P7/total)*100).toFixed(2) + '}]');
});

apiRouter.get('/porcentaje/:numeroPartido', async (req, res) => {
    const total = await Votos.find().countDocuments();
    const numPartido = req.params.numeroPartido;
    const porPartido = await Votos.find({numeroPartido: numPartido}).countDocuments();
    const porCent = ((porPartido / total) * 100).toFixed(2);
    res.jsonp(porCent);
    //Por ejemplo /api/porcentaje/2 devuelve el 42,86 (que sería por ciento del total)
});

apiRouter.get('/partidos', async (req, res) => {
    const todosPartidos = await Partidos.find();
    res.jsonp(todosPartidos);
    //devuelve json de todos los partidos
});

apiRouter.get('/partido/:numeroPartido', async (req, res) => {
    const elPartido = await Partidos.find({ numeroPartido: req.params.numeroPartido });
    res.jsonp(elPartido);

});

apiRouter.get('/aggregate', async (req, res) => {
    const votosDesc = await Votos.aggregate(
        [{ $group:
         { _id: '$numeroPartido',
            votos: { $sum: 1 } }
        }
         ]);
    res.jsonp(votosDesc);
    //[{"_id":7,"votos":2},{"_id":4,"votos":1},{"_id":2,"votos":3},{"_id":6,"votos":1}]
});

apiRouter.get('/aggregate/:numeroPartido', async (req, res) => {
    const numPart = req.params.numeroPartido;
    const votosDesc = await Votos.aggregate(
        [{ $match: 
            { numeroPartido: { numPart } }
        },
        { $group:
            { _id: '$numeroPartido',
               votos: { $sum: 1 } }
           }
         ]);
    res.jsonp(votosDesc);
    //[{"_id":7,"votos":2},{"_id":4,"votos":1},{"_id":2,"votos":3},{"_id":6,"votos":1}]
});

module.exports = apiRouter;