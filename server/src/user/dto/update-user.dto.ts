import { IsString } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  role: Role;

  @IsString()
  password: string;
}
