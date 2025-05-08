import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: 'very_very_secret',
  }),],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
