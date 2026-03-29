import express from 'express';
import * as memberController from '../controllers/memberController.js';

const router = express.Router();

router.get('/', memberController.getAllMembers);
router.post('/', memberController.createMember);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);
router.post('/card/add', memberController.addMemberToCard);
router.post('/card/remove', memberController.removeMemberFromCard);
router.get('/card/:cardId', memberController.getCardMembers);

export default router;
