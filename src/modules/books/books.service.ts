import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { Book, newBooksDTO, updateBooksDTO } from './books.models';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Books') private readonly booksModel: Model<Book>,
    private readonly userService: UserService,
  ) {}

  async create(createBooksDto: newBooksDTO) {
    const newBooks = new this.booksModel({
      title: createBooksDto.title,
      description: createBooksDto.description,
      author_id: createBooksDto.author_id,
      image: createBooksDto.image,
    });
    if (await this.userService.findOne(createBooksDto.author_id)) {
      const result = await newBooks.save();
      return {
        operation: {
          success: true,
          message: 'Book added successfully',
          data: { book: result },
        },
      };
    } else {
      return {
        operation: {
          success: false,
          message: 'user doesn t exist',
          data: { book: null },
        },
      };
    }
  }

  async findAll() {
    return await this.booksModel.find().exec();
  }

  async findOne(id: string) {
    return await this.booksModel.findById(id);
  }

  async update(id: string, updateBooksDTO: updateBooksDTO) {
    const updateBooks = await this.findOne(id);

    if (updateBooksDTO.title) {
      updateBooks.title = updateBooksDTO.title;
    }
    if (updateBooksDTO.description) {
      updateBooks.description = updateBooksDTO.description;
    }

    updateBooks.save();

    return updateBooks;
  }

  async remove(id: string) {
    return await this.booksModel.deleteOne({ _id: id });
  }
}
