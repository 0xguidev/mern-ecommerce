import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// @desc    Remove user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id);

  if (users) {
    await users.remove();
    return res.status(200).json({ message: 'User removed' });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

export default deleteUser;
