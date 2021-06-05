import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, bookDTO, updateBookDTO } from './books.models';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';



@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private readonly booksModel: Model<Book>,
    private readonly userService: UserService,
    ) {}
    
  
  async create(createBookDto: bookDTO) {
    const newBook = new this.booksModel({
      
      title: createBookDto.title,
      description: createBookDto.description,
      author_id: createBookDto.author_id,
    });

      if (await this.userService.findOne(createBookDto.author_id)){
        const result = await newBook.save();
        return {
          operation: {
            success: true,
            message: 'book added successfully',
            data: { books: result },
          },
        };
      }
    const existedBook = await this.findOneByTitle(createBookDto.title);
    if (existedBook) {
      return {
        operation: {
          success: false,
          message: 'Book already exists',
          data: { Book: null },
        },
      };
    }
    const result = await newBook.save();
    return {
      operation: {
        success: true,
        message: 'book added successfully',
        data: { book: result },
      },
    };
  }

  async findAll() {
    return await this.booksModel.find().exec();
  }
  async findOne(id: string) {
   
      return await this.booksModel.findById(id);
    
  }

  async findOneByTitle(title: string) {
    return await this.booksModel.findOne({ title: title });
  }

  async update(id: string, updateBookDto: updateBookDTO) {
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

  async remove(id: string) {
    return await this.booksModel.deleteOne({ _id: id });
  }
}

