const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserInfo, getUsers, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), getUserInfo);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
