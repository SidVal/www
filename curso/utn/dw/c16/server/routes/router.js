var express = require("express");
var router = express.Router();
var User = require("../models/user");
const path = require("path");


router.get("/", function(req, res, next) {
    return res.sendfile(path.join(__rootName, "/login.html"));
});

router.get("/profile", requiresLogin, function(req, res, next) {
    return res.sendFile(path.join(__authorizedDir, "/profile.html"));
});

router.get("/list", requiresLogin, function(req, res, next) {
    return res.sendFile(path.join(__authorizedDir, "/list.html"));
});

router.get("/detail/:id", requiresLogin, function(req, res, next) {
    return res.sendFile(path.join(__authorizedDir, "/detail.html"));
});

router.get("/addmovie", requiresLogin, function(req, res, next) {
    return res.sendFile(path.join(__authorizedDir, "/addmovie.html"));
});

router.get("/editmovie/:id", requiresLogin, function(req, res, next) {
    return res.sendFile(path.join(__authorizedDir, "/editmovie.html"));
});



//Escucho el post de mi pagina principal...
router.post("/", function(req, res, next) {
    //confirmar datos del usuario...
    if (req.body.password != req.body.passwordConf) {
        var err = new Error("Passwords no coinciden...");
        err.status = 400;
        res.send("Passwords no coinciden...");
        return next(err);
    }

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
        })
    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
            if (error || !user) {
                var err = new Error("No existe el usuario o clave incorrecta...");
                err.status = 400;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect("/list");
            }
        })
    }
})

router.get("/logout", requiresLogin, function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect("/");
            }
        })
    }
})

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("Tiene que estar logueado para ver esta página...");
        err.status = 401;
        return next(err);
    }
}

module.exports = router;