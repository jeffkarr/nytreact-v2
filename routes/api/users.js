const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
    .post(usersController.create);

router.route("/:userEmail")
    .get(usersController.find);

    // Matches with "/api/users/:id"
router.route("/:id")
    .delete(usersController.remove);

module.exports = router;