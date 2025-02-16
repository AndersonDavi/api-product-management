import { Schema } from 'mongoose';

const ProductSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  description: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  numReviews: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: { type: [String], required: true },
  sizes: { type: [String], required: true },
  stock: { type: Number, required: true },
  updated_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

export default ProductSchema;
