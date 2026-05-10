const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BAD_REQUEST, NOT_FOUND, CONFLICT, UNAUTHORIZED,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        const error = new Error("User not found");
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      if (err.name === "CastError") {
        const error = new Error("Invalid data");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        const error = new Error("User not found");
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      if (err.name === "ValidationError" || err.name === "CastError") {
        const error = new Error("Invalid data");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    return res.status(BAD_REQUEST).send({
      message: 'The "email" and "password" fields are required'
    });
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      return res.status(201).send(userObject);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        const error = new Error("Invalid data");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      if (err.code === 11000) {
        const error = new Error("Email already exists");
        error.statusCode = CONFLICT;
        return next(error);
      }

      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(BAD_REQUEST).send({
      message: 'Email and password are required'
    });
  }
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

      res.send({ token });
    })
    .catch((err) => {
      if (err.statusCode === UNAUTHORIZED) {
        return res.status(UNAUTHORIZED).send({ message: "Incorrect email or password" });
      }

      return next(err);
    });
};

module.exports = {
  getCurrentUser,
  updateProfile,
  createUser,
  login,
};
