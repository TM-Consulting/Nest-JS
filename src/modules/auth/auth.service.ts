import { Injectable } from '@nestjs/common';
import { loginDTO } from '../user/user.models';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  login = async (loginDto: loginDTO) => {
    const user = await this.userService.findOne(loginDto.email);
    if (user) {
      if ((await bcrypt.hash(loginDto.password, user.salt)) === user.password) {
        const { ...payload } = user;
        return {
          access_token: this.jwtService.sign(payload),
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
}
