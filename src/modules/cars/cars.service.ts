import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    return result;
  }

  findAll() {
    return `This action returns all cars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: newCarDTO) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
