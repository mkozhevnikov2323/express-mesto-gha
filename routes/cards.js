const router = require('express').Router();
const { createCard } = require('../controllers/cards');

router.post('/cards', createCard);
