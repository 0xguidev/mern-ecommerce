import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';

// @desc    Get product by id
// @route   Get /api/products/:id
// @acess   Public
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.status(200).json(product);
    }
    return res.status(404).json({ message: 'Product not Found' });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export default getProductById;
