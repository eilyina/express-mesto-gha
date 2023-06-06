const router = require('express').Router();
const { NOT_FOUND } = require('../utils/error-response-code');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth')


router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);



// роуты, которым авторизация нужна
router.use('/cards', require('./cards'));

router.use('/users', require('./users'));

//router.use('/cards', require('./cards'));
router.use(require('../middlewares/errorHandler'));

router.use('/', (req, res) => res.status(NOT_FOUND).send({ message: 'Неверный url' }));

module.exports = router;
