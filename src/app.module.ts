import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { CarsModule } from './modules/cars/cars.module';
import { UserModule } from './modules/user/user.module';

console.log('Hiii', config.database.mongoDB_Cluster);
@Module({
  imports: [
    UserModule,
    CarsModule,
    MongooseModule.forRoot(config.database.mongoDB_Cluster),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
