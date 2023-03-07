import express from 'express';
import authUser from '../controllers/User/AuthUser.js';
import deleteUser from '../controllers/User/DeleteUser.js';
import getUserById from '../controllers/User/GetUserById.js';
import getUserProfile from '../controllers/User/GetUserProfile.js';
import getUsers from '../controllers/User/GetUsers.js';
import registerUser from '../controllers/User/RegisterUser.js';
import updateUser from '../controllers/User/UpdateUser.js';
import updateUserProfile from '../controllers/User/UpdateUserProfile.js';
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
