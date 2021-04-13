import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../schema/User';
import Token from '../schema/Token';

import AppError from '../../../shared/errors/AppError';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

class AuthController {
  async signup (req, res) {
    try {
      let user = await User.findOne({ email: req.body.email });
    
      if (user) {
        next(new AppError('E-mail address already registered.', 400));
      }

      user = await User.create(req.body);
      const accessToken = await user.generateToken();
      const refreshToken = await user.generateRefreshToken();
      return res.status(201).json({ accessToken, refreshToken, user });
    } catch (error) {
      next(new AppError(error));
    }
  }

  async login (req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        next(new AppError('No user found', 400));
      } else {
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (valid) {
          const accessToken = await user.generateToken();
          const refreshToken = await user.generateRefreshToken();
          return res.status(201).json({ accessToken, refreshToken, user });
        } else {
          next(new AppError(error));
        }
      }
    } catch (error) {
      throw new AppError(error);
    }
  }

  async generateRefreshToken (req, res) {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) {
        next(new AppError('Access denied! Token not sent.', 403));
      } else {
        const tokenDoc = await Token.findOne({ token: refreshToken });
        if (!tokenDoc) {
          next(new AppError('Token has expired!', 401));
        } else {
          const payload = jwt.verify(tokenDoc.token, REFRESH_TOKEN_SECRET);
          const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
            expiresIn: '10m'
          })
          return res.status(200).json({ accessToken });
        }
      }
    } catch (error) {
      next(new AppError(error));
    }
  }

  async logout (req, res) {
    try {
      const { refreshToken } = req.body;
      await Token.findOneAndDelete({ token: refreshToken });
      return res.status(200).json({ success: 'User logged out!' });
    } catch (error) {
      next(new AppError(error));
    }
  }
}

export default new AuthController()