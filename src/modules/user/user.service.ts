import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDTO, updateUserDTO, loginUserDTO } from './user.models';
import * as bcrypt from 'bcrypt';
import { CarsService } from '../cars/cars.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly carsService: CarsService,
    private jwtService: JwtService,
  ) {} // @Inject() private readonly carsService: CarsService,

  async create(createUserDto: userDTO) {
    const salt = await bcrypt.genSalt();
    const newUser = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      salt: salt,
      password: await bcrypt.hash(createUserDto.password, salt),
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
  login = async (loginUserDTO: loginUserDTO) => {
    const user = await this.findOneByEmail(loginUserDTO.email);
    if (!user)
      return {
        operation: {
          success: false,
          message: 'email or password are not corrects',
          data: { user: null },
        },
      };
    else {
      const hashedPassword = await bcrypt.hash(
        loginUserDTO.password,
        user.salt,
      );
      console.log(hashedPassword, user.password);

      if (hashedPassword === user.password) {
        const payload = { ...user };
        const jwt = await this.jwtService.sign(payload);
        return {
          access_token: jwt,
        };
      } else
        return {
          operation: {
            success: false,
            message: 'Password is not correct',
            data: { user: null },
          },
        };
    }
  };
  async findAll() {
    // return await this.userModel.find().exec();

    return this.carsService.findAll();
  }

  async findOne(id: string) {
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
