const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        about: req.body.about,
        phone: req.body.phone,
        instagram: req.body.instagram,
        facebook: req.body.facebook,
        whatsapp: req.body.whatsapp,
        interest: req.body.interest,
        password: bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
            });
          })
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    } 
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: "User was registered successfully!" });
                    });
                });
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};
exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            
            var passwordIsValid = bcrypt.compare(
                req.body.password, user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null, message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ 
                id: user.id,
                username: user.username,
                roles: user.roles,
                image: user.image,
                email: user.email,
                instagram: user.instagram,
                facebook: user.facebook,
                whatsapp: user.whatsapp,
                interest: user.interest,
            }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            var authorities = []; for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id, username: user.username, userImage: user.image,userMail: user.email, whatsapp: user.whatsapp,
                roles: authorities, instagram: user.instagram, facebook: user.facebook, interest: user.interest, accessToken: token, 
            });
        });
};

