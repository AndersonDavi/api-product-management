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
  UseGuards,
} from '@nestjs/common';
import { create } from 'domain';
import { CreateProductDTO } from './dto/create-product.dto';
import { log } from 'console';
import { ProductService } from './product.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { UserRole } from 'src/common/enums/role.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Auth([UserRole.admin])
  @Post('/create')
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    await this.productService
      .createProduct(createProductDTO)
      .then((product) => {
        return res.status(HttpStatus.OK).json({
          message: 'Product Successfully Created',
          product,
        });
      });
  }

  @Auth([UserRole.admin, UserRole.user])
  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Auth([UserRole.admin, UserRole.user])
  @Get('/:id')
  async getProduct(@Res() res, @Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  @Auth([UserRole.admin])
  @Put('/delete/:id')
  async deleteProduct(
    @Res() res,
    @Body() { newStatus }: { newStatus: boolean },
    @Param('id') id,
  ) {
    const product = await this.productService.deleteProduct(id, newStatus);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      product,
    });
  }

  @Auth([UserRole.admin])
  @Put('/update/:id')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Param('id') id,
  ) {
    const product = await this.productService.updateProduct(
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
