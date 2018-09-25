var mongoose = require("mongoose");
var Movie = require("../models/movies");
var express = require("express");
var routerDetail = express.Router();

routerDetail.get("/:id", function(req, res, next) {
    return res.sendfile(path.join(__authorizedDir, "/detail.html"));
});