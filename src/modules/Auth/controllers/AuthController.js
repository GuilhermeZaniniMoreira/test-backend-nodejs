import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../schema/User';
import Token from '../schema/Token';

import AppError from '../../../shared/errors/AppError';

class AuthController {
  async signup(req, res, next) {
    try {
      let user = await User.findOne({ email: req.body.email });
    
      if (user) {
        throw new AppError('E-mail address already registered.', 400);
      }

      user = await User.create(req.body);
      const accessToken = await user.generateToken();
      const refreshToken = await user.generateRefreshToken();
      console.log(accessToken, refreshToken);
      return res.status(201).json({ accessToken, refreshToken, user });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new AppError('No user found', 400);
      } else {
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (valid) {
          const accessToken = await user.generateToken();
          const refreshToken = await user.generateRefreshToken();
          return res.status(201).json({ accessToken, refreshToken, user });
        } else {
          next(error);
        }
      }
    } catch (error) {
      throw new AppError(error);
    }
  }

  async generateRefreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) {
        throw new AppError('Access denied! Token not sent.', 403);
      } else {
        const tokenDoc = await Token.findOne({ token: refreshToken });
        if (!tokenDoc) {
          throw new AppError('Token has expired!', 401);
        } else {
          const payload = jwt.verify(tokenDoc.token, process.env.REFRESH_TOKEN_SECRET);
          const accessToken = jwt.sign({ user: payload }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10m'
          })
          return res.status(200).json({ accessToken });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      await Token.findOneAndDelete({ token: refreshToken });
      return res.status(200).json({ success: 'User logged out!' });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController()