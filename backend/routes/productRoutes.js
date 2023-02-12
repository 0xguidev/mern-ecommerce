import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
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
