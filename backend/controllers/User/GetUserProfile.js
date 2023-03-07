import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import generateToken from '../../utils/generateToken.js';

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.status(404).json({ message: 'Invalid email or password' });
  }
});

export default getUserProfile;
