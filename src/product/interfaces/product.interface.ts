import { Document } from 'mongoose';

export interface Product extends Document {
  readonly _id: string;
  readonly createdAt: Date;
  readonly description: string;
  readonly image: string;
  readonly name: string;
  readonly numReviews: number;
  readonly price: number;
  readonly rating: number;
  readonly reviews: string[];
  readonly sizes: string[];
  readonly stock: number;
  readonly updatedAt: Date;
  readonly active: boolean;
}
