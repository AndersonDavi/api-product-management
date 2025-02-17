import { IsEmail, IsString, IsBoolean } from 'class-validator';
export class UpdateUserDTO {
  readonly _id: string;
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  readonly password: string;
  @IsString()
  readonly role: string;
  readonly active: boolean;
}
