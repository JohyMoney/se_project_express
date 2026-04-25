const router = require('express').Router();
const { getUsers } = require('../controllers/user');
const userRoutes = require('./users');

router.use('/users', userRoutes);

const getUsers = require('../controllers/Users');



router.post('/', createUser);

router.get('/', getUsers);

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`User ID: ${id}`);
});

router.get('/:id/profile', (req, res) => {
    const { id } = req.params;
    res.send(`Profile of user ID: ${id}`);
});

module.exports = router;