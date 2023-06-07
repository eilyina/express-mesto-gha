const router = require('express').Router();
const { celebrate } = require('celebrate');
const { cardCreateSchema, idSchema } = require('../utils/celebrateSchema');

const {
  getCards, createCard, getCardById, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate(cardCreateSchema), createCard);
router.get('/:id', celebrate(idSchema), getCardById);
router.delete('/:id', celebrate(idSchema), deleteCard);
router.put('/:id/likes', celebrate(idSchema), likeCard);
router.delete(
  '/:id/likes',
  celebrate(idSchema),
  dislikeCard,
);

module.exports = router;
