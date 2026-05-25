const winston = require("winston");

const requestLoggerInstance = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: "logs/request.log" })],
});

const errorLoggerInstance = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: "logs/error.log" })],
});

const requestLogger = (req, res, next) => {
  requestLoggerInstance.info({
    method: req.method,
    url: req.originalUrl,
  });
  next();
};

const errorLogger = (err, req, res, next) => {
  errorLoggerInstance.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  });
  next(err);
};

module.exports = {
  requestLogger,
  errorLogger,
};
