var mongoose = require("mongoose");

var candidatoSchema = new mongoose.Schema({});


var candidato = mongoose.model("candidato", candidatoSchema);
module.exports = candidato;