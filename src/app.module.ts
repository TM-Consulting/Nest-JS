import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(config.database.mongoDB_Cluster),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
