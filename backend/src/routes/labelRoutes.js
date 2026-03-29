import express from 'express';
import * as labelController from '../controllers/labelController.js';

const router = express.Router();

router.get('/board/:boardId', labelController.getLabelsByBoardId);
router.post('/', labelController.createLabel);
router.put('/:id', labelController.updateLabel);
router.delete('/:id', labelController.deleteLabel);
router.post('/card/add', labelController.addLabelToCard);
router.post('/card/remove', labelController.removeLabelFromCard);

export default router;
