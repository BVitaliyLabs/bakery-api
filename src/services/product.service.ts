import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  private dbFile = 'data.json';
  private data: { products: Product[] };

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    try {
      const jsonData = fs.readFileSync(this.dbFile, 'utf-8');
      this.data = JSON.parse(jsonData);
    } catch (error) {
      this.data = { products: [] };
    }
  }

  private saveData(): void {
    fs.writeFileSync(this.dbFile, JSON.stringify(this.data));
  }

  getAllProducts(): Product[] {
    return this.data.products;
  }

  getProductById(id: number): Product {
    return this.data.products.find((product) => product.id === id);
  }

  createProduct(product: Product): void {
    const newId = this.data.products.length > 0 ? this.data.products[this.data.products.length - 1].id + 1 : 1;
    product.id = newId;
    this.data.products.push(product);
    this.saveData();
  }

  updateProduct(id: number, product: Product): void {
    const index = this.data.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.data.products[index] = { ...product, id };
      this.saveData();
    }
  }

  deleteProduct(id: number): void {
    this.data.products = this.data.products.filter((p) => p.id !== id);
    this.saveData();
  }
}
