import express from 'express';
import asyncHandle from 'express-async-handler';
const router = express.Router();
import Products from '../models/productModel.js';

// @desc    Fetch all products
// @route   Get /api/products
// @acess   Public
router.get(
  '/',
  asyncHandle(async (_req, res) => {
    const products = await Products.find({});
    res.status(200).json(products);
  })
);

// @desc    Fetch single product
// @route   Get /api/products/:id
// @acess   Public
router.get(
  '/:id',
  asyncHandle(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
