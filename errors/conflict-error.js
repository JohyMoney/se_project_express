const AppError = require("./app-error");
const { CONFLICT } = require("../utils/errors");

class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, CONFLICT);
  }
}

module.exports = ConflictError;
