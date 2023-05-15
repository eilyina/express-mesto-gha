const router = require('express').Router();

router.use('/', (req, res) => {
  return res.status(404).send({ message: "Неверный url" })
});

module.exports = router;