import express from 'express';
import { addOrderItems } from '../controllers/orderController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();
// PUBLIC
router.post('/', protect, addOrderItems);

export default router;
