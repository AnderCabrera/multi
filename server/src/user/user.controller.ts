import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { User as UserModel } from '@prisma/client';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.MINI_ADMIN, Role.ADMIN, Role.USER)
  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.getAllUsers();
  }

  @Roles(Role.MINI_ADMIN, Role.ADMIN, Role.USER)
  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<UserModel | HttpException> {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(
    @Body() userObject: RegisterDto,
  ): Promise<HttpException> {
    return await this.userService.createUser(userObject);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() userObject: UpdateUserDto,
  ): Promise<HttpException> {
    return await this.userService.updateUser(id, userObject);
  }

  @Roles(Role.MINI_ADMIN, Role.ADMIN)
  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<HttpException> {
    return await this.userService.deleteUser(id);
  }
}
