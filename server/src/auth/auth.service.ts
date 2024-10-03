import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) { }

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
          roleId: userObject.roleId
        }
      })

    } catch (e) {
      console.error(e);
    }
  }

  async getUsers() {
    return await this.prismaService.user.findMany();
  }
}
