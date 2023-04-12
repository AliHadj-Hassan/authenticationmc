import mongoose from "mongoose";

export interface IGeneralUserSchema extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  is_confirmed: boolean;
  role: String;
  compareEncryptedPassword: (password: string) => Promise<boolean>;
  getEncryptedPassword: (password: string) => Promise<string>;
}
