var express = require("express");
var router = express.Router();

const UsersController = require("./controllers/users.controller");

router.get("/", UsersController.index.bind(UsersController));
router.get("/:id", UsersController.show.bind(UsersController));
router.post("/", UsersController.store.bind(UsersController));
router.patch("/:id", UsersController.update.bind(UsersController));
router.delete("/:id", UsersController.delete.bind(UsersController));

module.exports = router;
