const AppError = require("./app-error");
const { NOT_FOUND } = require("../utils/errors");

class NotFoundError extends AppError {
  constructor(message = "Requested resource not found") {
    super(message, NOT_FOUND);
  }
}

module.exports = NotFoundError;
