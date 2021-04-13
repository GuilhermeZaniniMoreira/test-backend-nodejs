import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Token from './Token';

const UserSchema = new Schema({
  email: {
    lowercase: true,
    required: true,
    type: String
  },
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  password: {
    required: true,
    select: false,
    type: String
  },
  role: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

UserSchema.pre('save', async function hashPassword (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },
  async generateRefreshToken() {
    const refreshToken = jwt.sign({ user: { email: this.email, id: this.id, role: this.role } }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '10m'
    })
    await Token.create({ token: refreshToken });
    return refreshToken;
  },
  generateToken() {
    return jwt.sign({ user: { email: this.email, id: this.id, role: this.role } }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
  }
}
export default model('User', UserSchema);
