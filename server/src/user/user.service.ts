import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async getAllUsers() {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id: number, { name, lastname, password }: UpdateUserDto) {
    try {
      let hashed = await hash(password, 10);

      return await this.prismaService.user.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          lastname,
          password: hashed,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: number) {
    try {
      return await this.prismaService.user.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
