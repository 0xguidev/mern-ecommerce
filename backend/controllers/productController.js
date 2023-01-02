import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all products
// @route   Get /api/products
// @acess   Public
export const getProducts = asyncHandler(async (_req, res) => {
  try{
    const products = await Product.find({});
    if(products) {
      return res.status(200).json(products);
    }
    return res.status(400).json({ message: 'Products not found'})

  } catch(e) {
    console.log(e.message)
    return res.status(400).json({ message: e.message })
}
});

// @desc    Get product by id
// @route   Get /api/products/:id
// @acess   Public
export const getProductById = asyncHandler(async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);
  
    if (product) {
      return res.status(200).json(product);
    }
      return res.status(404).json({ message: 'Product not Found' });

  } catch(e) {
    return res.status(400).json({ message: e.message})
  }

});

// @desc    Update product 
// @route   Put /api/products/:id
// @acess   PRIVATE/ADMIN
export const updateProduct = asyncHandler(async (req, res) => {
  try{
    if(!req.params.id) {
      return res.status(400).json({message: 'proudct id mal formed'})
    }
  
    const product = await Product.findById(req.params.id);
    const reqProduct = req.body;
    if (product) {
        product._id = req.params.id;
        product.name = reqProduct.name || product.name;
        product.image = reqProduct.image || product.image;
        product.brand = reqProduct.brand || product.brand;
        product.category = reqProduct.category || product.category;
        product.description = reqProduct.description || product.description;
        product.rating = reqProduct.rating || product.rating;
        product.numReviews = reqProduct.numReviews || product.numReviews;
        product.price = reqProduct.price || product.price;
        product.countStock = reqProduct.countStock || product.countStock;
        product.reviews = reqProduct.reviews || product.reviews;
  
      const newProduct = await product.save()
  
      if(newProduct){
        return res.status(200).json(newProduct);
      }
    } 
  
    return res.status(404).json({ message: 'Product not Found' });
  } catch (e){
    return res.status(400).json({ message: e.message})
  }
});

// @desc    Delete product
// @route   Delete /api/products/:id
// @acess   PRIVATE/ADMIN
export const deleteProduct = asyncHandler(async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      return res.status(200).json({ message: 'Product removed' });
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch(e) {
    return res.status(400).json({ message: e.message})
  }
});