import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../schema/User';
import Token from '../schema/Token';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

class AuthController {
  async signup (req, res) {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: 'E-mail address already registered.' });
      }

      user = await User.create(req.body);
      const accessToken = await user.generateToken();
      const refreshToken = await user.generateRefreshToken();
      return res.status(201).json({ accessToken, refreshToken, user });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' })
    }
  }

  async login (req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ error: 'No user found.' });
      } else {
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (valid) {
          const accessToken = await user.generateToken();
          const refreshToken = await user.generateRefreshToken();
          return res.status(201).json({ accessToken, refreshToken, user });
        } else {
          return res.status(401).json({ error: 'Incorrect password!' });
        }
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' })
    }
  }

  async generateRefreshToken (req, res) {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) {
        return res.status(403).json({ error: 'Access denied! Token not sent.' });
      } else {
        const tokenDoc = await Token.findOne({ token: refreshToken });
        if (!tokenDoc) {
          return res.status(401).json({ error: 'Token has expired!' });
        } else {
          const payload = jwt.verify(tokenDoc.token, REFRESH_TOKEN_SECRET);
          const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
            expiresIn: '10m'
          })
          return res.status(200).json({ accessToken });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error!' })
    }
  }

  async logout (req, res) {
    try {
      const { refreshToken } = req.body;
      await Token.findOneAndDelete({ token: refreshToken });
      return res.status(200).json({ success: 'User logged out!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }
}

export default new AuthController()