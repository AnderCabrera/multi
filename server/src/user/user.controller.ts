import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Roles(Role.TEST)
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() userObject: UpdateUserDto) {
    return await this.userService.updateUser(id, userObject);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
