var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
});

//Autenticacion...
UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email })
        .exec(function(err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                var err = new Error("Usuario no encontrado...");
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if (result == true) {
                    return callback(null, user);
                } else {
                    var err = new Error("Clave ingresada invalida...");
                    err.status = 401;
                    return callback(err);
                }
            });
        });
}

//Guardar un usuario....
UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;