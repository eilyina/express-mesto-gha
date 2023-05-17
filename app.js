const express = require('express');
const mongoose = require('mongoose');

const app = express(); // создаём сервер
// подключаемся к серверу mongo
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// подключаем мидлвары, роуты и всё остальное...
app.use((req, res, next) => {
  req.user = {
    _id: '645dbebd2ec3a996cb3a1c37', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(require('./routes/index'));

app.listen(3000, () => {
  console.log('подключен');
});
