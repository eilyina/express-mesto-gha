const mongoose = require('mongoose');
const User = require('../models/user');
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,

} = require('../utils/error-response-code');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((users) => { res.send(users); })

    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(NOT_FOUND).send({ message: 'Данные не найдены' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Данные не найдены' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Данные не найдены' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка' });
    });
};
