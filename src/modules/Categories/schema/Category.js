import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default model('Category', CategorySchema);
