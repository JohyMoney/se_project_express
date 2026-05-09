const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRoutes = require("./routes/index");
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("./utils/errors");

const app = express();

const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());

app.use("/", mainRoutes);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  let message;

  if (statusCode === BAD_REQUEST) {
    message = "Invalid data";
  } else {
    message = "An error has occurred on the server.";
  }

  return res.status(statusCode).send({ message });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
