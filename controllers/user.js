const User = require ('../models/User');

const getUsers = async (req, res) => {
  User.find({})
      .then(users => res.json(users))
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Server error' });
      });

    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
    if (err) {
        console.error(err);
        res.status(400).json({ message: 'Server error' });
    }
};

const createUser = async (req, res) => {
    const { name, email } = req.body;

    user.create{name,avatar}

    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const createUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    getUsers,
    createUser
};