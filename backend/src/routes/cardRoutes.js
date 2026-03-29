import express from 'express';
import * as cardController from '../controllers/cardController.js';

const router = express.Router();

router.get('/list/:listId', cardController.getCardsByListId);
router.get('/:id', cardController.getCardById);
router.post('/', cardController.createCard);
router.put('/:id', cardController.updateCard);
router.put('/:id/cover', cardController.updateCardCover);
router.delete('/:id', cardController.deleteCard);
router.put('/:id/move', cardController.moveCard);

export default router;
