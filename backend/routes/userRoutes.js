import express from 'express';
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// PUBLIC
router.post('/', registerUser);
router.post('/login', authUser);
// PRIVATE
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
