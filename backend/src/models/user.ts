import { Document, model, Schema } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

import { Timestamps } from './common';

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

export interface User extends Document, Timestamps {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  verifyPassword(password: string): boolean;
}

UserSchema.pre<User>('save', async function() {
  if (!this.isModified('password')) return;

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

UserSchema.methods.verifyPassword = function(password: string) {
  return compare(password, this.password);
};

export const UserModel = model<User>('User', UserSchema);
