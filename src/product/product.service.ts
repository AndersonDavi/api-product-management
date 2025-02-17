import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find({ active: true });
    return products;
  }
  async getProduct(productID: string): Promise<Product | null> {
    console.log('productID', productID);

    const product = await this.productModel.findOne({
      _id: productID,
    });
    console.log('produt finded', product);
    return product;
  }
  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDTO);
    return await product.save();
  }
  async deleteProduct(
    productID: number,
    newStatus: boolean,
  ): Promise<Product | null> {
    console.log(newStatus);

    const desactivatedProduct = await this.productModel.findByIdAndUpdate(
      productID,
      { active: newStatus },
      { new: true },
    );
    return desactivatedProduct;
  }

  async updateProduct(
    productID: number,
    createProductDTO: CreateProductDTO,
  ): Promise<Product | null> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }

  async updateStock(productId: string, quantity: number): Promise<void> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.stock + quantity < 0) {
      throw new NotFoundException('Insufficient stock');
    }
    product.stock += quantity;
    await product.save();
  }
}
