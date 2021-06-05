import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {BooksSchema} from './books.models';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Books', schema: BooksSchema }]),
UserModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
