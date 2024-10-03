import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }

  @Get('/users')
  async getUsers() {
    return this.authService.getUsers();
  }
}
