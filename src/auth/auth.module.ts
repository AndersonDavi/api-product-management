import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PasswordService } from './services/password.service';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from 'src/global.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), GlobalModule],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
})
export class AuthModule {}
