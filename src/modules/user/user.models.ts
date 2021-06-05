import { Length, IsEmail, IsOptional } from 'class-validator';
import * as mongoose from 'mongoose';

export class userDTO {
<<<<<<< HEAD
  @Length(3, 30)
=======
  @Length(2, 30)
>>>>>>> 918525c77d4880c4c2f57ce65a37c3b21ef210d4
  name: string;

  @Length(6, 40)
  @IsEmail()
  email: string;

  @Length(6, 15)
  password: string;
}

export class updateUserDTO {
<<<<<<< HEAD
  @Length(3, 30)
=======
  @Length(2, 30)
>>>>>>> 918525c77d4880c4c2f57ce65a37c3b21ef210d4
  @IsOptional()
  name?: string;

  @Length(6, 40)
  @IsEmail()
  @IsOptional()
  email?: string;
}

export class loginDTO {
  @Length(6, 30)
  password: string;

  @Length(6, 40)
  @IsEmail()
  email: string;
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  email_verified: { type: Boolean, required: false, default: false },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  email_verified: boolean;
}
