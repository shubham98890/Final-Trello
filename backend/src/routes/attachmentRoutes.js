import express from 'express';
import * as attachmentController from '../controllers/attachmentController.js';

const router = express.Router();

router.get('/card/:cardId', attachmentController.getAttachmentsByCardId);
router.post('/', attachmentController.createAttachment);
router.get('/:attachmentId', attachmentController.getAttachmentById);
router.delete('/:attachmentId', attachmentController.deleteAttachment);

export default router;
