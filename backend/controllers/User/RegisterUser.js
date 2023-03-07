import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import generateToken from '../../utils/generateToken.js';

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
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

export default registerUser;
