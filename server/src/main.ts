import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

// TODO: fix temporal solution
const prisma = new PrismaService();

async function initialData() {
  try {
      await prisma.role.create({
        data: {
          name: 'ADMIN',
        }
      })

  } catch (e) {
    console.error(e);
  }
}

// initialData()

bootstrap();
