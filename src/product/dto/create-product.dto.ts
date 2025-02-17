import {
  IsString,
  IsBoolean,
  IsDate,
  IsNumber,
  IsArray,
} from 'class-validator';
export class CreateProductDTO {
  @IsString()
  readonly _id: string;
  @IsBoolean()
  readonly active: boolean;
  @IsDate()
  readonly createdAt: Date;
  @IsString()
  readonly description: string;
  @IsString()
  readonly image: string;
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly price: number;
  @IsNumber()
  readonly rating: number;
  @IsArray()
  @IsString({ each: true })
  readonly sizes: string[];
  @IsNumber()
  readonly stock: number;
  @IsDate()
  readonly updatedAt: Date;
}
