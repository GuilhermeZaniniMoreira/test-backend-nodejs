import { Schema, model } from 'mongoose';

const TokenSchema = new Schema({
  token: {
    type: String
  }
}, {
  timestamps: true,
});

export default model('Token', TokenSchema);
