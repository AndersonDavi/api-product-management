import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Res() res, @Body() registerDTO: RegisterDTO) {
    const result = await this.authService
      .register(registerDTO)
      .then((result) => {
        return res.status(HttpStatus.OK).json({
          message: 'User Successfully Created',
          result,
        });
      });
  }

  @Post('login')
  async login(@Res() res, @Body() loginDTO: LoginDTO) {
    const result = await this.authService.login(loginDTO).then((result) => {
      return res.status(HttpStatus.OK).json({
        message: 'User Successfully Logged In',
        result,
      });
    });
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return req.user;
  }
}
