var express = require("express");
var routerApi = express.Router();
var Votante = require("../models/votante");
var Votocandidato = require("../models/votocandidato");



routerApi.post("/", function(req, res, next) {
    
    var votante = new Votante({
        name: req.body.name,
        dni: req.body.dni,
        sex: req.body.sex,
    });


    votante.save(function(error, response) {
        if (error) return res.status(500).send(error);
        //res.status(200).jsonp("OK");
         res.redirect("/votacion");
    });
 });

routerApi.post("/votocandidato", function(req, res, next) {
    
    var votocandidato = new Votocandidato({
        idcandidato: req.body.id,
        name: req.body.name,
        dnivotante: req.body.pepe,
    });

    votocandidato.save(function(error, response) {
        if (error) return res.status(500).send(error);
      //  res.status(200).jsonp("Voto ingresado correctamente a Cristina Fernandez");
       res.redirect("/estadisticas");
       
    });
});

routerApi.post("/votocandidato1", function(req, res, next) {
    
    var votocandidato = new Votocandidato({
        idcandidato: req.body.id,
        name: req.body.name,
        dnivotante: req.body.pepito,
    });

    votocandidato.save(function(error, response) {
       if (error) return res.status(500).send(error);
     //   res.status(200).jsonp("Voto ingresado correctamente a Mauricio Macri");
     res.redirect("/estadisticas");
     
    });
});


routerApi.post("/votocandidato2", function(req, res, next) {
    
    var votocandidato = new Votocandidato({
        idcandidato: req.body.id,
        name: req.body.name,
        dnivotante: req.body.pepote,
    });

    votocandidato.save(function(error, response) {
        if (error) return res.status(500).send(error);
      //  res.status(200).jsonp("Voto ingresado correctamente a Agustin Rossi");
        res.redirect("/estadisticas");
       
    });
});

routerApi.post("/votocandidato3", function(req, res, next) {
    
    var votocandidato = new Votocandidato({
        idcandidato: req.body.id,
        name: req.body.name,
        dnivotante: req.body.pepelo,
    });

    votocandidato.save(function(error, response) {
        if (error) return res.status(500).send(error);
       // res.status(200).jsonp("Voto ingresado correctamente a Ma. Eugenia Vidal");
        res.redirect("/estadisticas");
       
    });
});

// routerApi.get("/validar", function(req, res, next){
//     votante.find({ dni: { '$regex': filter } },
//    function(error, response) {
//         if (error) return res.status(500).send(error);
//         res.startus(200).jsonp(response);
//     });

// });

routerApi.get("/validar/:dni", async function(req, res, next) { //esto es para validar un DNI que pasas de tu form
    const dniResultado = await Votante.find({ dni: req.params.dni }); //esto busca en tu base de datos el dni y guarda el resultado en una constante que llamamos dniResultado
    console.log(dniResultado);
    if(dniResultado.length > 0 ) { //entonces validamos, si el resultado es mayor a cero
       res.jsonp(dniResultado); //si es mayor a cero, devolvemos el jsonp a la api
       } else { //si no es mayor a cero
           res.json(''); //entonces que devuelva un array vacío.
       };
});

routerApi.get("/total", async (req, res) => {
    const total = await Votante.find().count();
    res.jsonp(total);
});

routerApi.get("/contar1", async (req, res, next) => {
    
    const total = await Votante.countDocuments();
    const candidato1 = await Votocandidato.countDocuments({ idcandidato: (1) });
    res.jsonp(((candidato1 / total)*100).toFixed(2));
  
});
routerApi.get("/contar2", async (req, res, next) => {
    
    const total = await Votante.countDocuments();
    const candidato2 = await Votocandidato.countDocuments({ idcandidato: (2) });
    res.jsonp(((candidato2 / total)*100).toFixed(2));    
  
});
routerApi.get("/contar3", async (req, res, next) => {
    const total = await Votante.countDocuments();
    const candidato3 = await Votocandidato.countDocuments({ idcandidato: (3) });
    res.jsonp(((candidato3 / total)*100).toFixed(2));
});
routerApi.get("/contar4", async (req, res, next) => {
    const total = await Votante.countDocuments();
    const candidato4 = await Votocandidato.countDocuments({ idcandidato: (4) });
    res.jsonp(((candidato4 / total)*100).toFixed(2));
});

module.exports = routerApi;