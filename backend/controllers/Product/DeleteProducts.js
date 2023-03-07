import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';

// @desc    Delete product
// @route   Delete /api/products/:id
// @acess   PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      return res.status(200).json({ message: 'Product removed' });
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export default deleteProduct;
