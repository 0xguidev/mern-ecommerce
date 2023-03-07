import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';

// @desc    Create product
// @route   POST /api/products
// @acess   PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });

    const createProduct = await product.save();

    return res.status(201).json(createProduct);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});
export default createProduct;
