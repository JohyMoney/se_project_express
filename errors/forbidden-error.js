const AppError = require("./app-error");
const { FORBIDDEN } = require("../utils/errors");

class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, FORBIDDEN);
  }
}

module.exports = ForbiddenError;
