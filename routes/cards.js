const router = require('express').Router();
const {
  createCard, getCards, deleteCardById, addLikeCard, deleteLikeCard,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:id', deleteCardById);
router.put('/:cardId/likes', addLikeCard);
router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;
