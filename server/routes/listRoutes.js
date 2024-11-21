import express from 'express';
import { createList, deleteList, getCodesFromFile, getLists } from '../controllers/listController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createList).get(protect, getLists);
router.route('/:id').delete(protect, deleteList);
router.get('/fetch-codes',protect, getCodesFromFile);

export default router;
