class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
    this.message = 'На сервере произошла ошибка';
  }
}

module.exports = InternalServerError;
