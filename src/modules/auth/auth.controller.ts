import { Controller, Post, Body } from '@nestjs/common';
import { loginDTO } from '../user/user.models';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userDTO: loginDTO) {
    return this.authService.login(userDTO);
  }
}
