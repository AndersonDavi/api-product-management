export class UpdateUserDTO {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly active: boolean;
}
