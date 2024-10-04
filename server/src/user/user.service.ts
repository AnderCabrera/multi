import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async getAllUsers(): Promise<UserModel[]> {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id: number, { name, lastname, password }: UpdateUserDto): Promise<UserModel> {
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

  async deleteUser(id: number): Promise<UserModel> {
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
