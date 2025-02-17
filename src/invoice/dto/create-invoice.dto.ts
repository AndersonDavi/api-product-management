export class CreateInvoiceDTO {
  readonly user_id: string;
  readonly products: { productId: string; quantity: number }[];
  readonly total: number;
}
