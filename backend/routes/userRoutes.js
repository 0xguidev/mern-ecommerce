import express from 'express';
import {authUser, getUserProfile, registerUser} from "../controllers/useController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
// PUBLIC
router.post('/', registerUser)
router.post('/login', authUser)
// PRIVATE
router.get('/profile', protect, getUserProfile)

export default router