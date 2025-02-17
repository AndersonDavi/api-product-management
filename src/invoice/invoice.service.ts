import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './interfaces/invoice.interface';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel('Invoice') private readonly invoiceModel: Model<Invoice>,
    private readonly productService: ProductService,
  ) {}

  async createInvoice(createInvoiceDTO: CreateInvoiceDTO): Promise<Invoice> {
    const { products } = createInvoiceDTO;

    // Verify stock availability
    for (const product of products) {
      const productDetails = await this.productService.getProduct(
        product.productId,
      );
      if (!productDetails || productDetails.stock < product.quantity) {
        throw new NotFoundException(
          `Product ${product.productId} is out of stock`,
        );
      }
    }

    // Deduct stock
    for (const product of products) {
      await this.productService.updateStock(
        product.productId,
        -product.quantity,
      );
    }

    const invoice = new this.invoiceModel(createInvoiceDTO);
    return await invoice.save();
  }

  async getInvoiceById(invoiceId: string): Promise<Invoice | null> {
    const invoice = await this.invoiceModel.findById(invoiceId).lean().exec();
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }

  async getUserInvoices(userId: string): Promise<Invoice[]> {
    return await this.invoiceModel.find({ user_id: userId });
  }

  async getUserPurchasesLastMonth(userId: string): Promise<number> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return await this.invoiceModel.countDocuments({
      user_id: userId,
      date: { $gte: oneMonthAgo },
    });
  }
}
