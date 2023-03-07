import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

// @desc    Update Order to paid
// @route   Get /api/orders/:id/pay
// @acess   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();
    return res.status(200).json({ updateOrder });
  } else {
    return res.status(404).json({ message: 'Order not found' });
  }
});

export default updateOrderToPaid;
