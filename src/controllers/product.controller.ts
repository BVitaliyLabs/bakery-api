import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Product {
    return this.productService.getProductById(Number(id));
  }

  @Post()
  createProduct(@Body() product: Product): void {
    this.productService.createProduct(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: Product): void {
    this.productService.updateProduct(Number(id), product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): void {
    this.productService.deleteProduct(Number(id));
  }
}
