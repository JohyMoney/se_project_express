const AppError = require("./app-error");
const { BAD_REQUEST } = require("../utils/errors");

class BadRequestError extends AppError {
  constructor(message = "Invalid request data") {
    super(message, BAD_REQUEST);
  }
}

module.exports = BadRequestError;
