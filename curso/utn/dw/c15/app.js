var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var session = require("express-session");
var mongostore = require("connect-mongo")(session);
var path = require("path");

//conexion con mongo..
mongoose.connect("mongodb://localhost:27017/movieapp", { useNewUrlParser: true, promiseLibrary: bluebird });
var db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", function() {
    console.log("conectado a mongo...");
});

//establecer variables globales con las rutas del cliente...
__rootName = path.join(__dirname, "client/public");
__authorizedDir = path.join(__dirname, "client/authorized");

//usar sessiones para los logins...
app.use(session({
    secret: "testparadiplomaturadesarrolloweb",
    resave: true,
    saveUninitialized: false,
    store: new mongostore({
        mongooseConnection: db
    })
}));

//parseo de las request a json..
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ limit: '50mb', extended: 'false' }));
app.use(express.json({ limit: '50mb' }));

//servicio con directorio estatico publico...
app.use(express.static(__rootName));

//incluir rutas de accesso a la app...
var routes = require("./server/routes/router");
app.use('/', routes);

//incluid rutas de acceso a datos...
var routesApi = require("./server/routes/apiRouter");
app.use('/api/movie', routesApi);

//arrancar el server y escuchar en el puerto 3000.
app.listen(3000, function(error) {
    if (error != null) console.log("Error: " + err);
    console.log("App escuchando en el puerto 3000...");
});