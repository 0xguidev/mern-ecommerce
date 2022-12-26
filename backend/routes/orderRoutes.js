import express from 'express';
import {
  addOrderItems,
  getLoggedUserOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// PRIVATE
router.post('/', protect, addOrderItems);
router.get('/ordersUser', protect, getLoggedUserOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

export default router;
