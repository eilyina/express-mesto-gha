const mongoose = require('mongoose');
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  CONFLICT
} = require('../utils/error-response-code');

const errorHandler = (err, req, res, next)  => {
  const { message, status = 500 } = err;

   console.log(err)
   console.log('olo')

  if (err.code == 11000) {
    res.status(CONFLICT).send({ message: 'Пользователь с таким email уже зарегистрирован' });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    return;
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(NOT_FOUND).send({ message: 'Данные не найдены' });
    return;
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(UNAUTHORIZED).send({ message: 'Неправильные почта или пароль' });
    return;
  }

  // if (card.owner.toString() !== req.user._id) {
  //   return res.status(FORBIDDEN).send({ message: 'Запрещено редактировать чужие карточки' });

  // }


  res
    .status(status)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: status === INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message
    });

  return next()
}

module.exports = errorHandler
