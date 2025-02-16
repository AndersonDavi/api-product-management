import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class LoginDTO {
  @IsEmail()
  readonly email: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  readonly password: string;
}
