const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, FORBIDDEN } = require("../utils/errors");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
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
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        const error = new Error("You cannot delete another user's item");
        error.statusCode = FORBIDDEN;
        throw error;
      }

      return item.deleteOne().then(() => res.send(item));
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        const error = new Error("Item not found");
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

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        const error = new Error("Item not found");
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

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        const error = new Error("Item not found");
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

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
