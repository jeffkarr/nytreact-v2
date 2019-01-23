const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Matches with "/api/articles"
router.route("/")
  .post(articlesController.create);

router.route("/:userEmail")
  .get(articlesController.find);

// Matches with "/api/articles/:id"
router.route("/:id")
  .delete(articlesController.remove);

module.exports = router;
