const router = require('express').Router();
const { createCard, getCards, deleteCardById } = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:id', deleteCardById);

module.exports = router;
