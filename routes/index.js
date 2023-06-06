const router = require('express').Router();
const { NOT_FOUND } = require('../utils/error-response-code');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth')
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');


router.post('/signup',
celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), createUser);
router.post('/signin', login);

router.use(auth);

// роуты, которым авторизация нужна
router.use('/cards', require('./cards'));
router.use('/users', require('./users'));

//router.use('/cards', require('./cards'));

router.use(errors());
router.use(require('../middlewares/errorHandler'));


router.use('/', (req, res) => res.status(NOT_FOUND).send({ message: 'Неверный url' }));

module.exports = router;
