var express = require("express");
var router = express.Router();
const path = require("path");

router.get("/", function(req, res, next) {
    return res.sendFile(path.join(__rootName, "welcome.html"));
});
router.get("/form", function(req, res, next) {
    return res.sendFile(path.join(__rootName, "/form.html"));
});
//continuar ruteando las demas paginas...
router.get("/votacion", function(req, res, next) {
    return res.sendFile(path.join(__authorizedDir, "votacion.html"));
})
router.get("/estadisticas",  function (req, res, next){
    return res.sendFile(path.join(__authorizedDir, "estadisticas.html"))
})

module.exports = router;
