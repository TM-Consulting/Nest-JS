import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
