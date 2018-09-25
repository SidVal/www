var mongoose = require("mongoose");

var VotanteSchema = new mongoose.Schema({
    name: { type: String },
    dni: { type: Number  }, //el unique:true, hace que te aparezca la advertencia en node: "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead"
    sex: { type: String },
   
});

var Votante = mongoose.model("votante", VotanteSchema);
module.exports = Votante;