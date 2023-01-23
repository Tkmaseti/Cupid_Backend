const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);


const db = {};
db.mongoose = mongoose;
db.user = require("./user.models")(mongoose);
db.products = require("./product.models")(mongoose);
db.cart = require("./cart.models")(mongoose);
db.order = require("./order.models")(mongoose);
db.role = require("./role.models");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
