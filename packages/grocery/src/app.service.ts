import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { Product } from './product';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Groceries App running...';
  }
}
