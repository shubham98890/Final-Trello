import express from 'express';
import * as searchController from '../controllers/searchController.js';

const router = express.Router();

router.get('/cards', searchController.searchCards);
router.get('/filter/label', searchController.filterByLabel);
router.get('/filter/member', searchController.filterByMember);
router.get('/filter/duedate', searchController.filterByDueDate);

export default router;
