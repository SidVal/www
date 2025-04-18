var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book');

/* GET HOME PAGE - RETURN ALL BOOKS */
router.get('/', function(req, res, next) {
    Book.find(function(err, booklist) {
        if (err) return next(err);
        res.json(booklist);
    });
});

/* POST DATA */
router.post('/', function(req, res, next) {
    Book.create(req.body, function(err, response) {
        if (err) return next(err);
        res.json(response);
    });
});

/* PUT DATA */

/* DELETE */

/* GET BY ID */


module.exports = router;