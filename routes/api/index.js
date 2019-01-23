const router = require("express").Router();
const articleRoutes = require("./articles");
const userRoutes = require("./users");

// Article routes
router.use("/articles", articleRoutes);
// User routes
router.use("/users", userRoutes);

module.exports = router;
