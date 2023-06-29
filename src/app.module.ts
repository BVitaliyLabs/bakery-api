import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './controllers/product.controller';
import { OrderController } from './controllers/order.controller';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';

@Module({
  imports: [],
  controllers: [AppController, ProductController, OrderController],
  providers: [AppService, ProductService, OrderService],
})
export class AppModule {}
