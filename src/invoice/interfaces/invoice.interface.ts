import { Document } from 'mongoose';

export interface Invoice extends Document {
  readonly user_id: string;
  readonly products: { productId: string; quantity: number }[];
  readonly total: number;
  readonly date: Date;
}
