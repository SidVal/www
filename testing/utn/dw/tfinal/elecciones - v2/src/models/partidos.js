var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PartidosSchema = new Schema({
    numeroPartido: Number,
    nombrePartido: String,
    nombreCandidato: String,
    imagenPartido: String
});

module.exports = mongoose.model('partidos', PartidosSchema);
