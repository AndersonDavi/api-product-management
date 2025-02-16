export class CreateProductDTO {
  readonly _id: string;
  readonly createdAt: Date;
  readonly description: string;
  readonly image: string;
  readonly name: string;
  readonly numReviews: number;
  readonly price: number;
  readonly rating: number;
  readonly reviews: string[];
  readonly sizes: string[];
  readonly stock: number;
  readonly active: boolean;

}
