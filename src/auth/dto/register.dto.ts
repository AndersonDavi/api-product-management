import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class RegisterDTO {
  @IsString()
  @MinLength(1)
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  readonly password: string;
  @IsString()
  readonly role: string;
}
