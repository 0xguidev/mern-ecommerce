import express from 'express';
import addOrderItems from '../controllers/Order/AddOrderItem.js';
import getOrders from '../controllers/Order/GetAllOrders.js';
import getLoggedUserOrders from '../controllers/Order/GetLoggedUserOrder.js';
import getOrderById from '../controllers/Order/GetOrderById.js';
import updateOrderToPaid from '../controllers/Order/UpdateOrderToPaid.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// PRIVATE
router.post('/', protect, addOrderItems);
router.get('/ordersUser', protect, getLoggedUserOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.get('/', protect, admin, getOrders);

export default router;
