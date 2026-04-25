const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },


    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    profilePictureUrl: {
        type: String,
        validate: {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: 'You must enter a valid URL',
        }
    },
    avatar: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: 'You must enter a valid URL',
        }
    }
});

const getUsersByID = async (id) => {
      const {userId}= req.params;
      User.findById(userId)
          .then(user => res.json(user))
          .catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Server error' });
          });

    try {
        const user = await User.findById(id);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error('User not found');
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;

