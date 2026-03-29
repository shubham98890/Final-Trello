import express from 'express';
import * as commentController from '../controllers/commentController.js';

const router = express.Router();

router.get('/card/:cardId', commentController.getCommentsByCardId);
router.post('/', commentController.createComment);
router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);

export default router;
