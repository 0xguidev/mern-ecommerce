import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (e) {
      console.error(e.message);
      return res.status(401).json({ message: 'not authorized, token fail' });
    }
  }
});

export const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    return next()
  } else {
    return res.status(401).json({ message: 'Not authorized as an admin'})
  }
}