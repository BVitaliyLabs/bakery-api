import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ProductService } from './product.service';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
  private dbFile = 'ordersData.json';
  private data: { orders: Order[] };

  constructor(private readonly productService: ProductService) {
    this.loadData();
  }

  private loadData(): void {
    try {
      const jsonData = fs.readFileSync(this.dbFile, 'utf-8');
      this.data = JSON.parse(jsonData);
    } catch (error) {
      this.data = { orders: [] };
    }
  }

  private saveData(): void {
    fs.writeFileSync(this.dbFile, JSON.stringify(this.data));
  }

  getAllOrders(): Order[] {
    return this.data.orders;
  }

  getOrderById(id: number): Order {
    return this.data.orders.find((order) => order.id === id);
  }

  createOrder(order: Order): void {
    const newId = this.data.orders.length > 0 ? this.data.orders[this.data.orders.length - 1].id + 1 : 1;
    order.id = newId;
    order.status = false;
    this.calculateTotalAmount(order);
    this.data.orders.push(order);
    this.saveData();
  }

  updateOrder(id: number, order: Order): void {
    const index = this.data.orders.findIndex((o) => o.id === id);
    if (index !== -1) {
      this.calculateTotalAmount(order);
      this.data.orders[index] = { ...order, id };
      this.saveData();
    }
  }

  deleteOrder(id: number): void {
    this.data.orders = this.data.orders.filter((o) => o.id !== id);
    this.saveData();
  }

  private calculateTotalAmount(order: Order): void {
    let total = 0;
    order.products.forEach((product) => {
      const { productId, quantity } = product;
      const productData = this.productService.getProductById(productId);
      if (productData) {
        total += productData.price * quantity;
      }
    });
    order.totalAmount = total;
  }
}
