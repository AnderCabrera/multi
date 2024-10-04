import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: number }) {
    const { id } = payload;

    const user = this.authService.validateUser({ id });
    
    user.then((res) => {
      console.log({
        message: 'User found',
        user: res
      });
    });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', 404);
    }


    return user;
  }
}
