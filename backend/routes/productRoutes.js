import express from 'express';
const router = express.Router();
import {
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
// PUBLIC
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

//PRIVATE/ADMIN
router.route('/:id').put(protect, admin, updateProduct);
router.route('/:id').delete(protect, admin, deleteProduct);

export default router;
