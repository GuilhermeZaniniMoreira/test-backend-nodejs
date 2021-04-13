import jwt from 'jsonwebtoken'
import 'dotenv/config'

import AppError from '../errors/AppError';

const auth = (req, res, next) => {
  const token = req.get('x-auth-token')
  if (!token) {
    next(new AppError('Access denied, token missing!', 401));
  } else {
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = payload.user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        next(new AppError('Session expired, please log in again.', 401));
      } else if (error.name === 'JsonWebTokenError') {
        next(new AppError('Invalid token, please log in again.', 401));
      } else {
        next(new AppError(error, 400));
      }
    }
  }
}

export default auth;
