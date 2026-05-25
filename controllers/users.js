const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ConflictError = require("../errors/conflict-error");
const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }

      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
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
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }

      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }

      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  return bcrypt
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
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }

      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }

      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  updateProfile,
  createUser,
  login,
};
