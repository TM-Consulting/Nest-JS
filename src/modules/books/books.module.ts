import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './books.models';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),UserModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
