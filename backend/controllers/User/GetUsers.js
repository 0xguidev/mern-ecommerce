import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// @desc    GET all user
// @route   Get /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    return res.status(200).json(users);
  } else {
    return res.status(404).json({ message: 'Invalid email or password' });
  }
});

export default getUsers;
