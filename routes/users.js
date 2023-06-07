const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userUpdateSchema, idSchema, avatarUpdateSchema } = require('../utils/celebrateSchema');

const {
  getUsers, getUserInfo, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', celebrate(idSchema), getUserById);
router.patch(
  '/me',
  celebrate(userUpdateSchema),
  updateUser,
);
router.patch(
  '/me/avatar',
  celebrate(avatarUpdateSchema),
  updateUserAvatar,
);

module.exports = router;
