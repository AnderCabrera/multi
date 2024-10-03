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
    // Permissions
    if (!prisma.permission.findMany()) {
      await prisma.permission.create({
        data: {
          createPermissionLevel: true,
          readPermissionLevel: true,
          updatePermissionLevel: true,
          deletePermissionLevel: true,
          entities: ['all']
        }
      })
    }

    if (!prisma.role.findMany()) {
      await prisma.role.create({
        data: {
          name: 'ADMIN',
          roleDescription: 'Have access to all CRUD operations',
          permissionId: 1,
        }
      })
    }

  } catch (e) {
    console.error(e);
  }
}

// initialData()

bootstrap();

