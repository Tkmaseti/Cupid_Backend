const { authJwt } = require("../middleware"); 
const controller = require("../controllers/product.controllers");
const { isModerator } = require("../middleware/authJwt");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/products", controller.findAll);
    app.post("/api/products", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator], controller.create);
    app.get("/api/products", [authJwt.verifyToken], controller.findOne);
    app.delete("/api/products", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator], controller.deleteAll);
    app.delete("/api/products/:id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator], controller.deleteOne);
    app.put("/api/products/:id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator], controller.update);

};