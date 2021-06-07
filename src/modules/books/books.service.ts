import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDTO } from '../user/user.models';
import { UserService } from '../user/user.service';
import { Book, BooksDTO, updateBooksDTO } from './books.models';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private readonly booksModel: Model<Book>,
    private readonly userService: UserService,
  ) {}

  async create(createBooksDto: BooksDTO) {
    console.log(
      'testtt',
      await this.userService.findOne(createBooksDto.author_id),
    );
    if (await this.userService.findOne(createBooksDto.author_id)) {
      const newBook = new this.booksModel({
        title: createBooksDto.title,
        description: createBooksDto.description,
        author_id: createBooksDto.author_id,
      });

      const result = await newBook.save();
      return result;
    } else {
      return {
        operation: {
          success: false,
          message: 'user does not exists',
          data: { user: null },
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

  async update(id: string, updateBookDto: updateBooksDTO) {
    const updatedBook = await this.findOne(id);

    if (updateBookDto.title) {
      updatedBook.title = updateBookDto.title;
    }
    if (updateBookDto.description) {
      updatedBook.description = updateBookDto.description;
    }

    updatedBook.save();

    return updatedBook;
  }

  remove(id: string) {
    return `This action removes a #${id} book`;
  }
}
