import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import generateToken from '../../utils/generateToken.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});

export default authUser;