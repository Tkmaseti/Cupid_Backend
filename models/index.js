const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);


const db = {};
db.mongoose = mongoose;
db.user = require("./user.models")(mongoose);
db.gift = require("./gifts.models")(mongoose);
db.event = require("./events.models")(mongoose);
db.restuarant = require("./restuarant.model")(mongoose);
db.podcast = require("./podcast.model")(mongoose);
db.role = require("./role.models");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
