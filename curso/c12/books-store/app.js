var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var book = require('./routes/book');
var app = express();

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book);

mongoose.connect('mongodb://localhost/books-store', { useMongoClient: true, promiseLibrary: require('bluebird') })
    .then(() => console.log('conectado a la base de datos...'))
    .catch((err) => console.log(err));

module.exports = app;