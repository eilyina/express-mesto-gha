const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/constants');
const User = require('../models/user');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestError = require('../utils/BadRequestError');
const ConflictError = require('../utils/ConflictError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Данные не найдены'));
        return;
      }

      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Данные не найдены'));
        return;
      }

      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => {
      const {
        email, name, about, avatar,
      } = user;
      res.send({ email, name, about, avatar });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Данные не найдены'));
        return;
      }

      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Данные не найдены'));
        return;
      }

      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id },
        secretKey,
        { expiresIn: '7d' });

      // вернём токен
      res.send({ token });
    })
    .catch(err => next(err));
};
