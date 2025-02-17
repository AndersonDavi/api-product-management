import { Schema } from 'mongoose';

const ProductSchema = new Schema({
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  description: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  sizes: { type: [String], required: true },
  stock: { type: Number, required: true },
  updated_at: { type: Date, default: Date.now },
});

export default ProductSchema;
