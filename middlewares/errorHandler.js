const errorHandler = (err, req, res, next) => {
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
