const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/https?:\/\/(w{3}\.)?[\w\-\.\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{2,}/mi),
  }),
}), createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.patch('/*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с данным E-mail присутствует в базе.' });
    return;
  }
  if (err.code === 13) {
    res.status(401).send({ message: 'Неправильные почта или пароль!' });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Некорректный email или длина пароля менее 8 символов.' });
  }
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Некорректный id.' });
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? ('На сервере произошла ошибка')
        : message,
    });
});

app.listen(PORT);
