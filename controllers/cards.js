const Card = require('../models/card');
const mongoose = require('mongoose');

module.exports.getCards = (req, res) => {
  Card.find({})

    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: "Произошла неизвестная ошибка" }));
};

module.exports.getCardById = (req, res) => {

  Card.findById(req.params.id)
    .orFail()
    .then(cards => res.send(cards))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: "Данные не найдены" })

      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: "Переданы некорректные данные" })

      }
      return res.status(500).send({ message: "Произошла неизвестная ошибка" })
    }
    )
};

module.exports.deleteCard = (req, res) => {

  Card.findByIdAndDelete(req.params.id)
    .orFail()
    .then(cards => res.send(cards))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: "Данные не найдены" })

      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: "Переданы некорректные данные" })

      }
      return res.status(500).send({ message: "Произошла неизвестная ошибка" })
    }
    )
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: "Переданы некорректные данные" })
        return
      }
      return res.status(500).send({ message: "Произошла неизвестная ошибка" })

    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then(cards => res.send(cards))
    .catch((err) => {
      console.log(err)
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Переданы некорректные данные" })
        return
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: "Данные не найдены" })

      }
      return res.status(500).send({ message: "Произошла неизвестная ошибка" })

    });
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then(users => res.send(users))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Переданы некорректные данные" })
        return
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res.status(404).send({ message: "Данные не найдены" })

      }
      return res.status(500).send({ message: "Произошла неизвестная ошибка" })

    });
}
