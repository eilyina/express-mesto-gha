const router = require('express').Router();
const { celebrate, errors } = require('celebrate');
const errorHandler = require('../middlewares/errorHandler');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { userRegistrationSchema, userLoginSchema } = require('../utils/celebrateSchema');
const NotFoundError = require('../utils/NotFoundError');

router.post(
  '/signup',
  celebrate(userRegistrationSchema),
  createUser,
);
router.post('/signin', celebrate(userLoginSchema), login);

router.use(auth);
router.use('/cards', require('./cards'));
router.use('/users', require('./users'));

router.use(errors());
router.use(
  '/',
 (req, res, next) => next(new NotFoundError('Неверный url')),
);
router.use(errorHandler);

module.exports = router;
