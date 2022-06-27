const Card = require('../models/card');
const user = require('../models/user');

module.exports.createCard = (req, res) => {
  const {
    name, link, owner = req.user._id, likes, createdAt,
  } = req.body;

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Поле name должно содержать от 2 до 30 символов. Поле link обязательно.' });
      } else {
        res.status(500).send({ message: 'Внутренняя ошибка на сервере.' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      if (card.owner !== user._id) {
        res.status(403).send({ message: 'Доступ запрещен' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id поля card.' });
      } else {
        res.status(500).send({ message: 'Внутренняя ошибка на сервере.' });
      }
    });
};

module.exports.addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id поля card.' });
      } else {
        res.status(500).send({ message: 'Внутренняя ошибка на сервере.' });
      }
    });
};

module.exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id поля card.' });
      } else {
        res.status(500).send({ message: 'Внутренняя ошибка на сервере.' });
      }
    });
};
