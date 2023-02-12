import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   Get /api/products
// @acess   Public
export const getProducts = asyncHandler(async (_req, res) => {
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

// @desc    Get product by id
// @route   Get /api/products/:id
// @acess   Public
export const getProductById = asyncHandler(async (req, res) => {
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

// @desc    Delete product
// @route   Delete /api/products/:id
// @acess   PRIVATE/ADMIN
export const deleteProduct = asyncHandler(async (req, res) => {
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

// @desc    Create product
// @route   POST /api/products
// @acess   PRIVATE/ADMIN
export const createProduct = asyncHandler(async (req, res) => {
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

// @desc    Update product
// @route   Put /api/products/:id
// @acess   PRIVATE/ADMIN
export const updateProduct = asyncHandler(async (req, res) => {
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
