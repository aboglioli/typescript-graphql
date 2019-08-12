import { Document, model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel = model<IUser>('User', UserSchema);
