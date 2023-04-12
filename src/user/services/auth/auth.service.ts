import { Injectable } from '@nestjs/common';
import { decode, sign, verify } from 'jsonwebtoken';
import { firstValueFrom } from 'rxjs';
import { IPayload } from 'src/user/interfaces/payload.interface';

@Injectable()
export class AuthService {

  constructor() {

  }
  async signPayload(payload: IPayload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRATION_TOKEN });
  }

  public async decodeToken(token: string) {

    let result = null;
    try {
      const tokenData = decode(token) as {
        exp: number;
        res: any;
      };
      let resultVerification = verify(token, process.env.SECRET_KEY);
      if (!tokenData || Date.now() >= tokenData.exp * 1000) {

        result = null;
      } else {
        result = tokenData
      }
    } catch (e) {
      console.log(e)
      result = null;
    }
    return result;
  }

}
