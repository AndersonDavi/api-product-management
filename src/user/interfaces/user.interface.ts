import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly password?: string;
  readonly role: string;
  readonly active: boolean;
}
