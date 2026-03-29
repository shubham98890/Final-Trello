import express from 'express';
import * as listController from '../controllers/listController.js';

const router = express.Router();

router.get('/board/:boardId', listController.getListsByBoardId);
router.post('/', listController.createList);
router.put('/:id', listController.updateList);
router.delete('/:id', listController.deleteList);

export default router;
