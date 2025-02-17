import { Schema } from 'mongoose';

const InvoiceSchema = new Schema({
  user_id: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default InvoiceSchema;
