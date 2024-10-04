import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.MINI_ADMIN, Role.ADMIN)
  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.getAllUsers();
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() userObject: UpdateUserDto,
  ): Promise<UserModel> {
    return await this.userService.updateUser(id, userObject);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<UserModel> {
    return await this.userService.deleteUser(id);
  }
}
