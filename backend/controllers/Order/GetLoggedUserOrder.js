import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

// @desc    get Logged user orders
// @route   Get /api/orders/myorders
// @acess   Private
const getLoggedUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders) {
    return res.status(200).json(orders);
  }
  return res.status(400).json({ message: 'Order not found!' });
});

export default getLoggedUserOrders;
