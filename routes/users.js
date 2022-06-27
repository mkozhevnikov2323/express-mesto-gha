const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getUserInfo, getUsers, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
