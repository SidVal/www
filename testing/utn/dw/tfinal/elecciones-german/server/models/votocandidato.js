var mongoose = require("mongoose");

var VotocandidatoSchema = new mongoose.Schema({
    idcandidato: { type: Number },
    name: { type: String },
    dnivotante: { type: Number },
   
});

var Votocandidato = mongoose.model("votocandidato", VotocandidatoSchema);
module.exports = Votocandidato;