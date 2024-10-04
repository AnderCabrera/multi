import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }

  @Post('/login')
  login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }
}
