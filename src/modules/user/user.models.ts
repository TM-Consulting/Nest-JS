import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length, IsEmail, IsOptional } from 'class-validator';
import * as mongoose from 'mongoose';

export class userDTO {
  @ApiProperty({ example: 'abdou' })
  @Length(2, 30)
  name: string;

  @ApiProperty({ example: 'abdou@example.com', description: '  must me an email >6 crtr <15 crtr ' })
  @Length(6, 40)
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: ' must me > 6 crts <15 crts ',
  })
  @Length(6, 15)
  password: string;
}

export class updateUserDTO {
  @ApiPropertyOptional({ example: 'abdou' })
  @Length(2, 30)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'abdou@example.com', description: ' must me in email ' })
  @Length(6, 40)
  @IsEmail()
  @IsOptional()
  email?: string;
}

export class loginDTO {
  @ApiProperty({ example: '123456', description: ' must me > 6 crts ' })
  @Length(6, 30)
  password: string;

  @ApiPropertyOptional({ example: 'abdou@example.com', description: ' must me in email ' })
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
  token: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  token: string;
  password: string;
  salt: string;
  email_verified: boolean;
}
