const Card = require('../models/card');

class ValidationError extends Error {
  constructor() {
    super();
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.message = {
      message: 'Некорректное значение поля ввода. Поле ввода должно содержать от 2 до 30 символов.',
    };
  }
}

module.exports.createCard = (req, res) => {
  const {
    name, link, owner = req.user._id, likes, createdAt,
  } = req.body;

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch(() => {
      const validationError = new ValidationError();
      res.status(validationError.statusCode).json(validationError.message);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.send(err.name);
    });
};

module.exports.addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
