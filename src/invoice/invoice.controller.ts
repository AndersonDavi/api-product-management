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
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UserRole } from 'src/common/enums/role.enum';

@UseGuards(AuthGuard)
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Auth([UserRole.user])
  @Post('/create')
  async createInvoice(@Res() res, @Body() createInvoiceDTO: CreateInvoiceDTO) {
    const invoice = await this.invoiceService.createInvoice(createInvoiceDTO);
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
    return res.status(HttpStatus.OK).json(invoice);
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
    const count = await this.invoiceService.getUserPurchasesLastMonth(userId);
    return res.status(HttpStatus.OK).json({ count });
  }
}
