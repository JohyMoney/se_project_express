const AppError = require("./app-error");
const { UNAUTHORIZED } = require("../utils/errors");

class UnauthorizedError extends AppError {
  constructor(message = "Authorization required") {
    super(message, UNAUTHORIZED);
  }
}

module.exports = UnauthorizedError;
