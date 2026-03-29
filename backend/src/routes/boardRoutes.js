import express from 'express';
import * as boardController from '../controllers/boardController.js';

const router = express.Router();

router.get('/', boardController.getAllBoards);
router.get('/:id', boardController.getBoardById);
router.post('/', boardController.createBoard);
router.put('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

export default router;
