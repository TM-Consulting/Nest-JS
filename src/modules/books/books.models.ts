import { Length, IsOptional } from 'class-validator';
import * as mongoose from 'mongoose';

export class bookDTO {
  @Length(6, 30)
  title: string;

  @Length(6, 100)
  description: string;
  
  @Length(6, 100)
  author_id: string;


}

export class updateBookDTO {
  @Length(6, 30)
  @IsOptional()
  title?: string;

  @Length(6, 100)
  @IsOptional()
  description?: string;

 
}

export const BooksSchema = new mongoose.Schema({
   
  title: { type: String, required: true },
  description: { type: String, required: true },
  author_id: { type: String, required: true },
});

export interface Book extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  author_id: string;
  
}
