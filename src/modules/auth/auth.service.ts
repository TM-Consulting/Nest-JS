import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  login(userDTO: loginDTO) {
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
  }

  
}
