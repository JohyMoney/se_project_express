const router = require("express").Router();
const { NOT_FOUND } = require('../utils/errors');
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getItems);

router.use(auth);

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;