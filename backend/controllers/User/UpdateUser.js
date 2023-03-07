import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// @desc    Update user by admin
// @route   PUT /api/users/:id
// @access  Private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!req.body) {
    return res.status(404).json({ message: 'Invalid informations' });
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    return res.status(404).json({ message: 'User Invalid' });
  }
});

export default updateUser;
