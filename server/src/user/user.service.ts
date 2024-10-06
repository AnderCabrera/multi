import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<UserModel[]> {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id: number): Promise<UserModel | HttpException> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(userObject: RegisterDto): Promise<HttpException> {
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: {
          username: userObject.username,
        },
      });

      if (existingUser) {
        return new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
      }

      const { password } = userObject;
      const hashed = await hash(password, 10);

      userObject = { ...userObject, password: hashed };

      await this.prismaService.user.create({
        data: {
          name: userObject.name,
          lastname: userObject.lastname,
          username: userObject.username,
          password: userObject.password,
          role: userObject.role,
        },
      });

      return new HttpException('USER_CREATED', HttpStatus.CREATED);
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateUser(
    id: number,
    { name, lastname, username, role, password }: UpdateUserDto,
  ): Promise<HttpException> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      const existingUser = await this.prismaService.user.findUnique({
        where: {
          username,
        },
      });

      if (existingUser) {
        return new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
      }

      const hashed = await hash(password, 10);

      await this.prismaService.user.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          lastname,
          username,
          role,
          password: hashed,
        },
      });

      return new HttpException('USER_UPDATED', HttpStatus.OK);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: number): Promise<HttpException> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.user.delete({
        where: {
          id: Number(id),
        },
      });

      return new HttpException('USER_DELETED', HttpStatus.OK);
    } catch (error) {
      throw new Error(error);
    }
  }
}
