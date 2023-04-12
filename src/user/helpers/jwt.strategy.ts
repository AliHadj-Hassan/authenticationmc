import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { UserService } from '../services/user/user.service';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {

    const user = this.userService.findByPayload(payload)

    if (!user) {
      return done(
        new HttpException('Unauthorized access ', HttpStatus.UNAUTHORIZED),
        false,
      );
    }
    return done(null, user, payload.iat);
  }
}