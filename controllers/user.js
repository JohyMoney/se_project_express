const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND } = require("../utils/errors");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
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

const createUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        const error = new Error("Invalid data");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
