import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

// @desc    Get Order by Id
// @route   Get /api/orders/:id
// @acess   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    return res.status(200).json(order);
  }
  return res.status(404).json({ message: 'not found' });
});

export default getOrderById;
