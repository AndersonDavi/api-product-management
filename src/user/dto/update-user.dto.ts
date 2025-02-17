import { IsEmail, IsString, IsBoolean } from 'class-validator';
export class UpdateUserDTO {
  @IsString()
  readonly _id: string;
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly role: string;
  @IsBoolean()
  readonly active: boolean;
}
