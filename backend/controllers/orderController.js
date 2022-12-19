import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create new order
// @route   Get /api/orders
// @acess   Private
export const addOrderItems = asyncHandler(async (req, res) => {
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
    return res.status(400).json({ message: "No order items" });
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

// @desc    Get Order by Id
// @route   Get /api/orders/:id
// @acess   Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    return res.status(200).json(order);
  }
  return res.status(404).json({ message: "not found" });
});

// @desc    Update Order to paid
// @route   Get /api/orders/:id/pay
// @acess   Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
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
    return res.status(404).json({ message: "Order not found" });
  }
});
