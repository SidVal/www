/* Será el servidor */
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

//conectando a base de datos
mongoose.connect('mongodb://localhost/crud')
.then(db => console.log('Conexión Exitosa a BD'))
.catch(err => console.log(err));

//rutas importadas
const indexRoutes = require('./routes/index');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));

//rutas
app.use('/', indexRoutes);

//
app.listen(app.get('port'), () => {
    console.log(`Server escuchando en puerto ${app.get('port')}`);
})