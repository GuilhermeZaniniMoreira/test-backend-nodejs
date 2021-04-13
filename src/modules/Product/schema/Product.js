import mongoose, { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  }
}, {
  toJSON: { virtuals: true },
  timestamps: true
});

ProductSchema.virtual('category', {
  foreignField: '_id',
  justOne: true,
  localField: 'categoryId',
  ref: 'Category'
});

export default model('Product', ProductSchema);
