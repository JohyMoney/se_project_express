const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const {
  validateSignIn,
  validateSignUp,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/not-found-error");

const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

router.post("/signin", validateSignIn, login);
router.post("/signup", validateSignUp, createUser);
router.get("/items", getItems);

router.use(auth);

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;