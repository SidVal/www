#!/usr/bin/env node

//Modules
var app = require('../app');
var debug = require('debug')('books-app:server');
var http = require('http');

//Establece un puerto de entrada..
var port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

//Crear el HTTP server
var server = http.createServer(app);

//Escuchar el servicio en el puerto especifico...
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//Funcion de normalizePort
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

//Escuchadores de eventos de error y listening
function onError(error) {
    if (error.syscall != 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Tubo ' + port :
        'Puerto ' + port;

    //mostrar el error de manera mas agradable
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requiere de mayores privilegios.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' esta siendo usado en este momento.');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//Event listening
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'Tubo ' + addr :
        'Puerto ' + addr;
    console.log("Escuchando en " + bind);
}