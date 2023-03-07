import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

// @desc    Create new order
// @route   Get /api/orders
// @acess   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod: false, // until paymentMethod is ready
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    return res.status(201).json(createdOrder);
  }
});
export default addOrderItems;
