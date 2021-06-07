import { IsOptional, Length } from 'class-validator';
import * as mongoose from 'mongoose';

export class BooksDTO {
  title: string;
  description: string;
  author_id: string


}
export class updateBooksDTO {
  @Length(6, 30)
  @IsOptional()
   title?: string;

  @Length(6, 40)
  @IsOptional()
  description?: string;
}

export const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author_id: { type: String, required: true },

});

export interface Book extends mongoose.Document {
  id: string;
  title: string;
  description: string
  author_id: string
}