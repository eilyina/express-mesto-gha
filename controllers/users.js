const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const User = require('../models/user');
// const {
//   INTERNAL_SERVER_ERROR,
//   BAD_REQUEST,
//   NOT_FOUND,
// } = require('../utils/error-response-code');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      //throw new Error("sksk")
      res.send(users);
    })
    .catch(err => next(err));
};

module.exports.getUserById = (req, res,next) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      res.send({user})
    })
    .catch(err => next(err));
};

module.exports.getUserInfo = (req, res, next)  => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      // const { email, name, about, avatar } = user;
      // res.send({ email, name, about, avatar})
      res.send({user})
    })

    .catch(err => next(err));
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => { return User.create({ email, password: hash, name, about, avatar }) }
    )
    .then((user) => {
      const { email, _id, name, about, avatar } = user;
      res.send({ email, _id, name, about, avatar })
    })
    .catch(err => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch(err => next(err));
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ user }))
    .catch(err => next(err));
};

// controllers/users.js

module.exports.login = (req, res,next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' });

      // вернём токен
      res.send({ token });
    })
    .catch(err => next(err));
};
