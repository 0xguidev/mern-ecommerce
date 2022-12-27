import express from 'express';
import {
  authUser,
  deleteUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// PUBLIC
router.post('/', registerUser);
router.post('/login', authUser);
// PRIVATE
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
