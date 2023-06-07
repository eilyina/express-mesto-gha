const router = require('express').Router();
const { NOT_FOUND } = require('../utils/error-response-code');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth')
const { celebrate, Joi, errors } = require('celebrate');
const { urlRegExp } = require('../utils/constants');

router.post('/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlRegExp),
      password: Joi.string().required(),
      email: Joi.string().required().email(),
    }),
  }), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), login);

router.use(auth);
router.use('/cards', require('./cards'));
router.use('/users', require('./users'));
router.use(errors());
router.use(require('../middlewares/errorHandler'));
router.use('/', (req, res) => res.status(NOT_FOUND).send({ message: 'Неверный url' }));

module.exports = router;
