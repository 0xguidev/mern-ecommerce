import express from 'express';
import createProduct from '../controllers/Product/CreateProduct.js';
import deleteProduct from '../controllers/Product/DeleteProducts.js';
import getProducts from '../controllers/Product/GetProducts.js';
import getProductById from '../controllers/Product/GetProductsById.js';
import updateProduct from '../controllers/Product/UpdateProduct.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();
// PUBLIC
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

//PRIVATE/ADMIN
router.route('/').post(protect, admin, createProduct);
router.route('/:id').put(protect, admin, updateProduct);
router.route('/:id').delete(protect, admin, deleteProduct);

export default router;
