const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error("string.uri");
  }

  return value;
};

const validateSignUp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignIn = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateProfileUpdate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

const validateCreateItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().required().custom(validateUrl),
  }),
});

const validateItemId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateProfileUpdate,
  validateCreateItem,
  validateItemId,
};
