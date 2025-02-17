import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateInvoiceDTO {
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

  @IsArray()
  readonly products: {
    productId: string;
    quantity: number;
  }[];

  @IsNotEmpty()
  @IsNumber()
  readonly total: number;

  readonly date?: Date;
}
