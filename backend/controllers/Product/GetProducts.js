import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';

// @desc    Fetch all products
// @route   Get /api/products
// @acess   Public
const getProducts = asyncHandler(async (_req, res) => {
  try {
    const products = await Product.find({});
    if (products) {
      return res.status(200).json(products);
    }
    return res.status(400).json({ message: 'Products not found' });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
});

export default getProducts;
