const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('mongoose connect...'))
  .catch((e) => console.log(e));

app.use((req, res, next) => {
  req.user = {
    _id: '62a9001bbf0b724beb420e0d',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.patch('/*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
