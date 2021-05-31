import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validateOrReject } from 'class-validator';
import { Model } from 'mongoose';
import { newUserDTO, updateUserDTO, User } from './user.models';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: newUserDTO) {
    const newUser = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
    });
    const result = await newUser.save();
    return result;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: updateUserDTO) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
