import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDTO, updateUserDTO, loginDTO } from './user.models';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: userDTO) {
    const usersalt = await bcrypt.genSalt();
    const newUser = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, usersalt),
      salt: usersalt,
    });
    const existedUser = await this.findOneByEmail(createUserDto.email);
    if (existedUser) {
      return {
        operation: {
          success: false,
          message: 'user already exists',
          data: { user: null },
        },
      };
    }
    const result = await newUser.save();
    return {
      operation: {
        success: true,
        message: 'user added successfully',
        data: { user: result },
      },
    };
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  login = async (loginDto: loginDTO) => {
    const user = await this.findOne(loginDto.email);
    if (user) {
      console.log(
        'testt ',
        user.password,
        await bcrypt.hash(loginDto.password, user.salt),
      );
      if ((await bcrypt.hash(loginDto.password, user.salt)) === user.password) {
        return {
          operation: {
            success: true,
            message: 'login successfully',
            data: { user: user },
          },
        };
      } else {
        return {
          operation: {
            success: false,
            message: 'login failed',
            data: { user: null },
          },
        };
      }
    } else {
      return {
        operation: {
          success: false,
          message: 'user not exist',
          data: { user: null },
        },
      };
    }
  };

  async findOne(id: string): Promise<User> {
    if (id.includes('@')) {
      return await this.findOneByEmail(id);
    } else {
      return await this.userModel.findById(id);
    }
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async update(id: string, updateUserDto: updateUserDTO) {
    const updatedUser = await this.findOne(id);

    if (updateUserDto.email) {
      updatedUser.email = updateUserDto.email;
    }
    if (updateUserDto.name) {
      updatedUser.name = updateUserDto.name;
    }

    updatedUser.save();

    return updatedUser;
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
