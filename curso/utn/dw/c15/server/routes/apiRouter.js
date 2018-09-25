var Movie = require("../models/movies");
var express = require("express");
var routerApi = express.Router();

routerApi.post("/", function(req, res, next) {
    //Movie save...
    var movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        country: req.body.country,
        poster: req.body.poster,
        seasons: req.body.seasons,
        summary: req.body.summary,
        posterFile: req.body.posterFile
    });

    movie.save(function(error, response) {
        if (error) return res.status(500).send(error);
        //res.status(200).jsonp("OK");
        res.redirect("/list");
    });
});

routerApi.get("/", function(req, res, next) {
    //Retorna todas las peliculas...
    var skip = parseInt(req.query.skip);
    var limit = parseInt(req.query.limit);
    var filter = req.query.filter;
    var order = req.query.order;

    Movie.find({ title: { '$regex': filter } }, { title: 1, genre: 1, year: 1 }, { skip: skip, limit: limit, sort: order },
        function(error, response) {
            if (error) return res.status(500).send(error);
            res.status(200).jsonp(response);
        });
});

routerApi.get("/count", function(req, res, next) {
    var filter = req.query.filter;
    //Capturar el count...
    Movie.countDocuments({ title: { '$regex': filter } }, function(error, response) {
        if (error) return res.status(500).send(error);
        res.status(200).jsonp(response);
    })
});

routerApi.get("/:id", function(req, res, next) {
    //Get de pelicula por su id...
    Movie.findById(req.params.id, function(error, movie) {
        if (error) return res.status(500).send(error.message);
        res.status(200).jsonp(movie);
    });
});

routerApi.delete("/:id", function(req, res, next) {
    //Delete movie...
    Movie.findById(req.params.id, function(error, movie) {
        if (error) return res.status(500).send(error.message);
        movie.remove(function(err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).json("OK");
        })
    })
})

module.exports = routerApi;