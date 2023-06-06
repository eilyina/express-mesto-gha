const express = require('express');
const mongoose = require('mongoose');

const app = express(); // создаём сервер
// подключаемся к серверу mongo
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});


app.use(require('./routes/index'));
//app.use(require('./middlewares/errorHandler'));


app.listen(3000, () => {
  console.log('подключен');
});
