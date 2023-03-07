import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

// @desc    Get All Order
// @route   Get /api/orders
// @acess   Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');

  if (orders) {
    return res.status(200).json(orders);
  }
  return res.status(404).json({ message: 'not found' });
});

export default getOrders;
