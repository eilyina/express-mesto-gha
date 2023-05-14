const User = require('../models/user');
const mongoose = require('mongoose');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.send(users)
    })
    .then(users => {
      const { name, about, avatar } = data;
      res.send({ name: users.name })
    })
    .catch(() => res.status(500).send({ message: "Произошла неизвестная ошибка" }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)

    .then(users => { res.send(users) })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(404).send({ message: "Данные не найдены" })
        return
      }
      return res.status(500).send({ message: "Произошла неизвестная ошибка" })
    }
    )

};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: "Переданы некорректные данные" })
        return
      }
      return res.status(500).send({ message: "Произошла неизвестная ошибка" })

    });
};


module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true, runValidators: true })
    .then(user => {
      res.send({ user })
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: "Переданы некорректные данные" })
        return
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(404).send({ message: "Данные не найдены" })
        return
      }
      return res.status(500).send({ message: "Произошла неизвестная ошибка" })

    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(user => res.send({ user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: "Переданы некорректные данные" })
        return
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(404).send({ message: "Данные не найдены" })
        return
      }
      return res.status(500).send({ message: "Произошла неизвестная ошибка" })

    });
};