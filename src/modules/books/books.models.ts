import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length } from 'class-validator';
import * as mongoose from 'mongoose';

export class newBooksDTO {
  @ApiProperty({ example: 'hello world' })
  @Length(6, 45)
  title: string;

  @ApiProperty({ example: 'hello world bla bla between 6 and 600' })
  @Length(6, 600)
  description: string;

  @ApiProperty({ example: 'hye--yejhhj' })
  @Length(6, 30)
  author_id: string;

  @ApiPropertyOptional({ example: 'hello.jpg|png' })
  image?: string;
}

export class updateBooksDTO {
  @ApiPropertyOptional({ example: 'test' })
  title?: string;
  @ApiPropertyOptional({ example: 'description bla bla ' })
  description?: string;

  @ApiPropertyOptional({ example: 'hello.jpg|png' })
  image?: string;
}
export const BooksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author_id: { type: String, required: true },
  image: { type: String, required: true },
});

export interface Book extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  author_id: string;
<<<<<<< HEAD
  
=======
  image: string;
>>>>>>> 55c4e4262b9c36dfd790d1cec681d19abd94cf82
}
