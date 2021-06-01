import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { CarsModule } from './modules/cars/cars.module';
import { UserModule } from './modules/user/user.module';
<<<<<<< HEAD
console.log(config.database.mongoDB_Cluster)
=======
console.log(config.database.mongoDB_Cluster);
>>>>>>> 56121d588e8fa12f97927ff413416a64b65899d7
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
