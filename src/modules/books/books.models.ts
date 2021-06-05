import * as mongoose from 'mongoose';

export class newBooksDTO {
  title: string;
  description: string;
  author_id: string;
}
export class updateBooksDTO {
  title?: string;
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
