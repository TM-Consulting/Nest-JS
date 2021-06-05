import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { Book, newBooksDTO, updateBooksDTO } from './books.models';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Books') private readonly booksModel: Model<Book>,
  private readonly userService: UserService,
  ) {}
  async create(createBooksDto: newBooksDTO) {
    const newBook = new this.booksModel({
      title: createBooksDto.title,
      description: createBooksDto.description,
      author_id: createBooksDto.author_id,
    });
    if (await this.userService.findOne(createBooksDto.author_id)) {
      const result = await newBook.save();
      return {
        operation:{
          success:true,
          message: 'Book addes successfully',
          data: {books: result},
        }
      }
      
    }
  }

  async findAll() {
    return await this.booksModel.find().exec();
  }

  async findOne(id: string) {
    return await this.booksModel.findById(id);
  }

  async update(id: string, updateBookDto: updateBooksDTO) {
    const updateBook = await this.findOne(id);
    if (updateBookDto.title) {
      updateBook.title = updateBookDto.title;
    }
    if (updateBookDto.description) {
      updateBook.description = updateBookDto.description;
    }

    updateBook.save();
    return updateBook;
  }

  async remove(id: string) {
    return await this.booksModel.deleteOne({ _id: id });
  }
}
