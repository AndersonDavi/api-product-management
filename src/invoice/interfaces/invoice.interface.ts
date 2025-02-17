import { Document } from 'mongoose';

export interface Invoice extends Document {
  readonly user_id: string;
  readonly products: {
    productId: string;
    quantity: number;
    name?: string;
    price?: number;
    image?: string;
  }[];
  readonly total: number;
  readonly date: Date;
}
