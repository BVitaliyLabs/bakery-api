import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders(): Order[] {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string): Order {
    return this.orderService.getOrderById(Number(id));
  }

  @Post()
  createOrder(@Body() order: Order): void {
    this.orderService.createOrder(order);
  }

  @Put(':id')
  updateOrder(@Param('id') id: string, @Body() order: Order): void {
    this.orderService.updateOrder(Number(id), order);
  }

  @Patch(':id')
  updateOrderStatus(@Param('id') id: string, @Body() updateData: { status: boolean }): void {
    const order = this.orderService.getOrderById(Number(id));
    if (order) {
      order.status = updateData.status;
      this.orderService.updateOrder(Number(id), order);
    }
  }  

  @Delete(':id')
  deleteOrder(@Param('id') id: string): void {
    this.orderService.deleteOrder(Number(id));
  }
}
