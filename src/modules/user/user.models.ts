import { Length, IsEmail } from 'class-validator';
import * as mongoose from 'mongoose';

export class newUserDTO {
  // DATA TRANSFERT OBJECT
  @Length(6, 30)
  name: string;

  @IsEmail()
  email: string;
}
export class updateUserDTO {}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
}
