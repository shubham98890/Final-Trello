import express from 'express';
import * as checklistController from '../controllers/checklistController.js';

const router = express.Router();

router.get('/card/:cardId', checklistController.getChecklistsByCardId);
router.post('/', checklistController.createChecklist);
router.delete('/:id', checklistController.deleteChecklist);
router.post('/item', checklistController.addChecklistItem);
router.put('/item/:id', checklistController.updateChecklistItem);
router.delete('/item/:id', checklistController.deleteChecklistItem);

export default router;
