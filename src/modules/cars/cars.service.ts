import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
<<<<<<< HEAD
import { Car, newCarDTO } from './cars.models';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}
  async create(createCarDto: newCarDTO) {
    const newCarDTO = new this.carModel({
      name: createCarDto.name,
      brand: createCarDto.brand,
      miles: createCarDto.miles,
      horse_power: createCarDto.horse_power,
    });
    const result = await newCarDTO.save();
=======
import { Car, newCarsDTO, updateCarsDTO } from './cars.models';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Cars') private readonly carsModel: Model<Car>) {}
  async create(createCarsDto: newCarsDTO) {
    const newCar = new this.carsModel({
      modele: createCarsDto.modele,
      marque: createCarsDto.marque,
      kilometrage: createCarsDto.kilometrage,
      puissance_fiscale: createCarsDto.puissance_fiscale,
    });
    const result = await newCar.save();
>>>>>>> 56121d588e8fa12f97927ff413416a64b65899d7
    return result;
  }

  findAll() {
    return `This action returns all cars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

<<<<<<< HEAD
  update(id: number, updateCarDto: newCarDTO) {
=======
  update(id: number, updateCarDto: updateCarsDTO) {
>>>>>>> 56121d588e8fa12f97927ff413416a64b65899d7
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
