var express = require("express");
var router = express.Router();
var User = require("../models/user");
const path = require("path");

router.get("/", function(req, res, next) {
    return res.sendFile(path.join(__rootName, "login.html"));
});

router.get("/list", requiresLogin, function(req, res, next) {
    return res.sendFile(path.join(__authorizedDir, "/list.html"));
});


//continuar ruteando las demas paginas...

//Escucho el post de mi pagina de login..
router.post("/", function(req, res, next) {
    //confirmar los datos del usuario...
    if (req.body.password != req.body.passwordConf) {
        var err = new Error("Passwords no coinciden...");
        err.status = 401;
        res.send("Passwords no coinciden");
        return next(err);
    }

    //Detectar si estoy registrando un usuario...
    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        }

        User.create(userData, function(error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect("/profile");
            }
        });
    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
            if (error || !user) {
                var err = new Error("No exite el usuario o clave incorrecta...");
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect("/list");
            }
        });
    }
});


//middleware - capa intermedia que se ejecuta en medio del request...
function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("Tiene que estar logueado para ver esta pagina...");
        err.status = 401;
        return next(err);
    }
}

module.exports = router;