const mongoose = require('mongoose');
const Card = require('../models/card');
const ForbiddenError = require('../utils/ForbiddenError');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestError = require('../utils/BadRequestError');

module.exports.getCards = (req, res, next) => {
  Card.find({})

    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.getCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail()

    .then((card) => {
      res.send(card);
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

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      console.log(card.owner.toString());
      console.log(req.user._id);
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Запрещено редактировать чужие карточки'));
      }
      console.log(req.params.id);
      return Card.findByIdAndDelete(req.params.id);
    })
    .then(
      (card) => res.send({ card, message: 'карточка успешно удалена' }),
    )
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

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
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

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
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
