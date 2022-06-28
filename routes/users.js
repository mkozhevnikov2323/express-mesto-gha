const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserInfo, getUsers, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.get('/', getUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/https?:\/\/(w{3}\.)?[\w\-\.\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{2,}/mi),
  }),
}), updateUserAvatar);

module.exports = router;
