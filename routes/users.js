const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/constants');

const {
  getUsers, getUserInfo, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUserById);
router.patch('/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlRegExp)
    }),
  }),
  updateUser);
router.patch('/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlRegExp)
    }),
  }),
  updateUserAvatar);

module.exports = router;
