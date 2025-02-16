import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Delete,
  Put,
} from '@nestjs/common';
import { create } from 'domain';
import { CreateProductDTO } from './dto/create-product.dto';
import { log } from 'console';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productSerrvice: ProductService) {}

  @Post('create')
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    await this.productSerrvice
      .createProduct(createProductDTO)
      .then((product) => {
        return res.status(HttpStatus.OK).json({
          message: 'Product Successfully Created',
          product,
        });
      });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productSerrvice.getProducts();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:id')
  async getProduct(@Res() res, @Param('id') id) {
    const product = await this.productSerrvice.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  
  @Put('/delete/:id')
  async deleteProduct(
    @Res() res,
    @Body() { newStatus }: { newStatus: boolean },
    @Param('id') id,
  ) {
    const product = await this.productSerrvice.deleteProduct(id, newStatus);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      product,
    });
  }

  @Put('/update/:id')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Param('id') id,
  ) {
    const product = await this.productSerrvice.updateProduct(
      id,
      createProductDTO,
    );
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Updated Successfully',
      product,
    });
  }
}
