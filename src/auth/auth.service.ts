import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { PasswordService } from './services/password.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDTO: RegisterDTO): Promise<CreateUserDTO | any> {
    const user = await this.userService.getUserByEmail(registerDTO.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.passwordService.hashPassword(
      registerDTO.password,
    );
    const result = await this.userService.createUser({
      ...registerDTO,
      password: hashedPassword,
    });
    console.log(result);
    const userObject = result.toObject();
    delete userObject.password;
    return userObject;
  }

  async login(loginDTO: LoginDTO): Promise<string> {
    const user = await this.userService.getUserByEmail(loginDTO.email);
    if (!user) {
      throw new BadRequestException('This user does not exist');
    }
    const isPasswordValid = await this.passwordService.comparePassword(
      loginDTO.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = {
      userId: user.id,
      userRole: user.role,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
