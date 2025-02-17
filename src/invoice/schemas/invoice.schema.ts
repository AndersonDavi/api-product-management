import * as mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  products: [
    {
      productId: { type: String, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

export default InvoiceSchema;
