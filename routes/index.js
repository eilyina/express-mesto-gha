const router = require('express').Router();
const { NOT_FOUND } = require('../utils/error-response-code')

router.use('/users', require('./users'));

router.use('/cards', require('./cards'));

router.use('/', (req, res) => res.status(NOT_FOUND).send({ message: 'Неверный url' }));

module.exports = router;
