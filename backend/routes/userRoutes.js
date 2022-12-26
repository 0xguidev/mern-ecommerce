import express from 'express';
import {
  authUser,
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
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
