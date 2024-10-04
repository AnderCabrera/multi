import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async register(userObject: RegisterDto) {
    try {
      const { password } = userObject;
      const hashed = await hash(password, 10);

      userObject = { ...userObject, password: hashed };

      await this.prismaService.user.create({
        data: {
          name: userObject.name,
          lastname: userObject.lastname,
          username: userObject.username,
          password: userObject.password,
          role: userObject.role
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async login({ username, password }: LoginDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      const valid = await compare(password, user.password);

      if (!valid) {
        throw new HttpException('INVALID_PASSWORD', HttpStatus.UNAUTHORIZED);
      }

      const payload = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        role: user.role
      }

      const token = this.jwtService.sign(payload);

      const data = {
        user,
        token
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async validateUser(payload: { id: number }) {
    return await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        role: true,
      }
    });
  }
}
