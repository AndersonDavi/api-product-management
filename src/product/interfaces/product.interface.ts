import { Document } from 'mongoose';

export interface Product extends Document {
  readonly _id: string;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly description: string;
  readonly image: string;
  readonly name: string;
  readonly price: number;
  readonly rating: number;
  readonly sizes: string[];
  readonly stock: number;
  readonly updatedAt: Date;
}
