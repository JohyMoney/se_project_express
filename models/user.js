const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { UNAUTHORIZED } = require("../utils/errors");

const isValidUrl = (value) => {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: isValidUrl,
      message: "Invalid avatar URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /^\S+@\S+\.\S+$/.test(value),
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Incorrect email or password");
        error.statusCode = UNAUTHORIZED;
        throw error;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Incorrect email or password");
          error.statusCode = UNAUTHORIZED;
          throw error;
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);

