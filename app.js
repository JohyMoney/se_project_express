const express = require("express");
const mongoose = require("mongoose");
const mainRoutes = require("./routes/index");
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./utils/errors");

const app = express();

const { PORT = 3001 } = process.env;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "685f0f0f8f0f0f0f0f0f0f0f",
  };

  next();
});

app.use("/", mainRoutes);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message =
    statusCode === INTERNAL_SERVER_ERROR
      ? "An error occurred on the server"
      : err.message;

  return res.status(statusCode).send({ message });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Error connecting to MongoDB", err);
  });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
