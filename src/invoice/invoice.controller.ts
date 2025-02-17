import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Res,
  HttpStatus,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UserRole } from 'src/common/enums/role.enum';
import { ProductService } from 'src/product/product.service';
import { count } from 'console';

@UseGuards(AuthGuard)
@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly productService: ProductService,
  ) {}

  @Auth([UserRole.user])
  @Post('/create')
  async createInvoice(
    @Res() res,
    @Body() createInvoiceDTO: CreateInvoiceDTO,
    @Req() req,
  ) {
    const invoiceData = {
      ...createInvoiceDTO,
      user_id: req.user.id,
    };

    const invoice = await this.invoiceService.createInvoice(invoiceData);
    return res.status(HttpStatus.OK).json({
      message: 'Invoice Successfully Created',
      invoice,
    });
  }

  @Auth([UserRole.admin])
  @Get('/:id')
  async getInvoiceById(@Res() res, @Param('id') id: string) {
    const invoice = await this.invoiceService.getInvoiceById(id);
    if (!invoice) throw new NotFoundException('Invoice not found');

    const productsWithDetails = await Promise.all(
      invoice.products.map(async (product) => {
        const productDetails = await this.productService.getProduct(
          product.productId,
        );
        return {
          ...product,
          name: productDetails!.name,
          image: productDetails!.image,
        };
      }),
    );

    return res.status(HttpStatus.OK).json({
      ...invoice,
      products: productsWithDetails,
    });
  }

  @Auth([UserRole.admin, UserRole.user])
  @Get('/user/:userId')
  async getUserInvoices(@Res() res, @Param('userId') userId: string) {
    const invoices = await this.invoiceService.getUserInvoices(userId);
    return res.status(HttpStatus.OK).json(invoices);
  }

  @Auth([UserRole.admin])
  @Get('/user/:userId/purchases-last-month')
  async getUserPurchasesLastMonth(@Res() res, @Param('userId') userId: string) {
    const count = await this.invoiceService.getUserInvoicesLastMonth(userId);
    return res.status(HttpStatus.OK).json({ count });
  }

  @Auth([UserRole.admin])
  @Get('/data/all-purchases-last-month')
  async getAllInvoicesLastMonth(@Res() res) {
    const count = await this.invoiceService.getAllInvoicesLastMonth();
    return res.status(HttpStatus.OK).json({ count });
  }

  @Auth([UserRole.admin])
  @Get('/data/count-all-invoices-last-month')
  async countAllInvoicesLastMonth(@Res() res) {
    const totalAmount =
      await this.invoiceService.countAllInvoicesLastMonth();
    return res.status(HttpStatus.OK).json({ count: totalAmount });
  }
}
