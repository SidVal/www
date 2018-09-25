var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VotosSchema = new Schema({
    nombrePersona: String,
    apellidoPersona: String,
    documentoPersona: Number,
    sexoPersona: {
        type: String,
        enum: ['F','M']
    },
    numeroPartido: Number,
    votado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('votos', VotosSchema); 