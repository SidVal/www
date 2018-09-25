//servidor
var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http'),
    bodyParser = require('body-parser'),
    methodO = require('method-override'),
    server = http.createServer(app),
    session = require('express-session'), 
    morgan = require('morgan'), //se usa como middleware 
    mongoose = require('mongoose');

//conectando a base de datos; me daba error: DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect., así que agregué el { useNewUrlParser: true }
mongoose.connect('mongodb://localhost/elecciones', { useNewUrlParser: true })
.then(db => console.log('Conexión Exitosa a BD'))
.catch(err => console.log(err));

//usar sessiones para mantener datos cuando vuelvo de las apis
app.use(session({
    secret: "testparadiplomaturadesarrolloweb",
    resave: true,
    saveUninitialized: false
}));

//rutas importadas
var indexRoutes = require('./routes/index');
var apiRoutes = require('./routes/apiRouter');

//configuraciones
app.set('port', process.env.PORT || 3000); //la app define un puerto, el puerto del sistema operativo, y si no existe, que use el 3000
app.set('views', path.join(__dirname, 'views')); //usamos el módulo path para que la app sepa qué directorio use dependiendo del sistema operativo
app.set('view engine', 'ejs'); //definimos que usaremos EJS como motor de vistas o motor de plantillas

//middleware
app.use(morgan('dev')); //morgan será para ver cosas en la consola
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodO());
app.use('/', express.static(path.join(__dirname, 'assets'))) //archivos estáticos
app.use(express.static('assets')); // http://expressjs.com/en/starter/static-files.html

//rutas
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

//inicializando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server escuchando en puerto ${app.get('port')}`);
})