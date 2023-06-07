// const mongoose = require('mongoose');
// const NotFoundError = require('../utils/NotFoundError');
// const ConflictError = require('../utils/ConflictError');
// const BadRequestError = require('../utils/BadRequestError');
// const InternalServerError = require('../utils/InternalServerError');
// const {
//   INTERNAL_SERVER_ERROR,
//   BAD_REQUEST,
//   NOT_FOUND,
//   UNAUTHORIZED,
//   CONFLICT,
// } = require('../utils/error-response-code');

const errorHandler = (err, req, res, next) => {
  // const { message, status = 500 } = err;
  // console.log('ololo');
  // console.log(err);
  // if (err.code === 11000) {

  //   next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
  //   // res.status(CONFLICT).send({ message: 'Пользователь с таким email уже зарегистрирован' });
  // }

  // if (err instanceof mongoose.Error.ValidationError) {
  //   next(new BadRequestError('Переданы некорректные данные'));
  //   // res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  //   return;
  // }

  // if (err instanceof mongoose.Error.DocumentNotFoundError) {
  //   next(new NotFoundError('Данные не найдены'));
  //   return;
  // }
  // console.log('InternalServerError');
  // console.log(err);
  // next(new InternalServerError('dddd'));
  const { status = 500, message } = err;

  res
    .status(status)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};

module.exports = errorHandler;
