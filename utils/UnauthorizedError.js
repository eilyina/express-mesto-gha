class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.message = 'Необходима авторизация';
  }
}

module.exports = Unauthorized;
