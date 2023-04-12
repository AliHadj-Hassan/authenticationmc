import { IUser } from './../../interfaces/user.interface';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { ResetpwdDTO } from '../dto/resetpwd.dto';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  @MessagePattern('register')
  // @Post('register')
  async register(@Payload() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    return user;
  }
  @MessagePattern('login')
  async login(@Payload() loginDTO: LoginDTO) {
    const user = await this.userService.login(loginDTO);

    return user;
  }


  //@Post('resetpwd')
  @MessagePattern('verifytoken')
  async Verify(@Payload() token: string) {
    const res = await this.authService.decodeToken(token);
    return res;
  }


  @MessagePattern('reset-password')
  async resetPassword(@Payload() resetDTO: ResetpwdDTO) {
    const { username, newpassword } = resetDTO;

    let user = await this.userService.findOneByUsernameOrEmail(username);
    if (!user) {
      throw new HttpException('No user found with the provided username or email.', HttpStatus.BAD_REQUEST);
    }

    user.password = newpassword;
    await user.save();

    return { message: 'Password reset successful.' };
  }

  @MessagePattern("getUserById")
  async getUserById(@Payload() id: string): Promise<IUser> {
    return this.userService.findUserbyid(id);
  }

  /*
  @Get("onlyauth")
  @UseGuards(AuthGuard("jwt"))
  
   async hiddenInformation(){
     return  "hidden information";
   }
   */

  /*
     @Post('google-auth')
     async googleAuth(
         @Body('token') token: string,
         @Res({passthrough: true}) response: Response
     ) {
         const clientId = '982891557954-ah5mu7g55v9rin897bqeesjsb792o4p4.apps.googleusercontent.com';
         const client = new OAuth2Client(clientId);
  
         const ticket = await client.verifyIdToken({
             idToken: token,
             audience: clientId
         });
  
         const googleUser = ticket.getPayload();
  
         if (!googleUser) {
             throw new UnauthorizedException();
         }
  
         let user = await this.userService.findOneByUsernameOrEmail(email: googleUser.email);
  
         if (!user) {
             user = await this.userService.save({
                 first_name: googleUser.given_name,
                 last_name: googleUser.family_name,
                 email: googleUser.email,
                 password: await bcryptjs.hash(token, 12)
             });
         }
  
         const accessToken = await this.jwtService.signAsync({
             id: user.id
         }, {expiresIn: '30s'});
  
         const refreshToken = await this.jwtService.signAsync({
             id: user.id
         });
  
         const expired_at = new Date();
         expired_at.setDate(expired_at.getDate() + 7);
  
         await this.tokenService.save({
             user_id: user.id,
             token: refreshToken,
             expired_at
         });
  
         response.status(200);
         response.cookie('refresh_token', refreshToken, {
             httpOnly: true,
             maxAge: 7 * 24 * 60 * 60 * 1000 //1 week
         });
  
         return {
             token: accessToken
         };
     }*/
}
