import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';

// @desc    Update product
// @route   Put /api/products/:id
// @acess   PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'proudct id mal formed' });
    }

    const product = await Product.findById(req.params.id);
    const { name, image, brand, category, description, price, countInStock } =
      req.body;
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      return res.status(200).json(updatedProduct);
    } else {
      return res.status(404).json({ message: 'Product not Found' });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});
export default updateProduct;
