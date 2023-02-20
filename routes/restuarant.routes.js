const { authJwt } = require("../middleware"); 
const controller = require("../controllers/gift.controllers");
const { isModerator } = require("../middleware/authJwt");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/restuarant", controller.findAll);
    app.post("/api/restuarant", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
    app.get("/api/restuarant", [authJwt.verifyToken], controller.findOne);
    app.delete("/api/restuarant", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteAll);
    app.delete("/api/restuarant/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteOne);
    app.put("/api/restuarant/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

};