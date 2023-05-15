const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express(); // создаём сервер
// подключаемся к серверу mongo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

// подключаем мидлвары, роуты и всё остальное...

app.use((req, res, next) => {
  req.user = {
    _id: '645dbebd2ec3a996cb3a1c37' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});


app.use('/users', require('./routes/users'))
app.use('/cards', require('./routes/cards'));
app.use('/', require('./routes/router'));

app.listen(3000, () => { console.log('подключен') })
