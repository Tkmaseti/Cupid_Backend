const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req,res,next) => {
   
    User.findOne({username: req.body.username})
    .exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(user){
            res.status(400).send({message: "Failed! Username is already in use"});
            return;
        }

        User.findOne({email: req.body.email})
        .exec((err, user) => {
            if(err) {
                res.status(500).send({message: err});
                return;
            }
            if(user){
                res.status(400).send({message: "Failed! email is already in use"});
                return;
            }
            next();
        });
        User.findOne({phone: req.body.phone})
        .exec((err, user) => {
            if(err) {
                res.status(500).send({message: err});
                return;
            }
            if(user){
                res.status(400).send({message: "Failed! phone number is already in use"});
                return;
            }
            next();
        });
        User.findOne({idno: req.body.idno})
        .exec((err, user) => {
            if(err) {
                res.status(500).send({message: err});
                return;
            }
            if(user){
                res.status(400).send({message: "Failed! ID is already in use"});
                return;
            }
            next();
        });
        User.findOne({license: req.body.license})
        .exec((err, user) => {
            if(err) {
                res.status(500).send({message: err});
                return;
            }
            if(user){
                res.status(400).send({message: "Failed! license is already in use"});
                return;
            }
            next();
        });
    });
};


const checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++){
            if (!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                }); 
                return;
            }
        }
    }
    next();
};
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;