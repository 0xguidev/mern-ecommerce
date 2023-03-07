import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// @desc    GET user by id
// @route   GET /api/users/:id
// @access  Private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: 'User not found' });
});

export default getUserById;
