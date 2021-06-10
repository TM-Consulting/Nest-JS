import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { BooksModule } from './modules/books/books.module';
import { CarsModule } from './modules/cars/cars.module';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';
console.log(config.database.mongoDB_Cluster);
@Module({
  imports: [
    BooksModule,
    UserModule,
    MailModule,
    CarsModule,
    MongooseModule.forRoot(config.database.mongoDB_Cluster),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
