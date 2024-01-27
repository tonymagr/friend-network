const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers);

// /api/users/:id         -- including populated thought and friend data
router.route('/:id').get(getSingleUser);

module.exports = router;
