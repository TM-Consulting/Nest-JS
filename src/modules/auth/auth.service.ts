import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  login = async (loginDto: loginDTO) => {
    const user: any = await this.userService.findOne(loginDto.email);
    if (user) {
      if ((await bcrypt.hash(loginDto.password, user.salt)) === user.password) {
        const { salt, _id, __v, email_verified, ...rest } = user._doc;
        return {
          access_token: this.jwtService.sign(rest),
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
