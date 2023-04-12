import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './helpers/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),

   
  ],
  providers: [UserService, AuthService,JwtStrategy],
  controllers: [UserController],
  exports: [UserService,AuthService],
})
export class UserModule {}
