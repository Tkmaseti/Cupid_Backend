const { authJwt } = require("../middleware"); 
const controller = require("../controllers/user.controllers");
const { isModerator } = require("../middleware/authJwt");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/all", controller.allAccess);
    app.get("/api/test/user", [authJwt.verifyToken], controller.findAll);
    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
    app.put("/api/moderator/:id", [authJwt.verifyToken], controller.update);
    app.put("/api/user/:id", [authJwt.verifyToken], controller.update);
    app.get("/api/users", controller.findAll)
};