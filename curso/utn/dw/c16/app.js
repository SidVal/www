var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var path = require("path");

//conectar con mongo...
mongoose.connect('mongodb://localhost:27017/testAuth', { useNewUrlParser: true, promiseLibrary: bluebird });
var db = mongoose.connection;

__rootName = path.join(__dirname, "client/public");

__authorizedDir = path.join(__dirname, "client/authorized");

//manejo de errores...
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function() {
    //connectado...
    console.log("connectado a mongo...");
});

//usar sessiones para los logins...
app.use(session({
    secret: "testparadiplomaturadesarrolloweb",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//parseo de las request a json..
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: 'false' }));
app.use(express.json({ limit: '50mb' }));

//servicio con directorio estatico con archivos
app.use(express.static(__rootName));

//incluir rutas de acceso a la app...
var routes = require("./server/routes/router");
app.use('/', routes);
app.use('/profile', routes);

var routesApi = require('./server/routes/apiRouter');
app.use('/api/movie', routesApi);

//manejo de error 404
app.use(function(req, res, next) {
    var err = new Error('Archivo no encontrado...');
    err.status = 404;
    next(err);
});

//escuchar en el puerto 3000...
app.listen(3000, function() {
    console.log('App está escuchando en el puerto 3000...');
});