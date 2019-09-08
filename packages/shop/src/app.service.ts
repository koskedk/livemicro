import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { Product } from './product';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Shop App running...';
  }
  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'subscribe-route',
    queue: 'subscribe-queue'
  })
  public async pubSubHandler(msg: any) {
    const product = new Product(msg.name);
    console.log(`++++++++++++++++++++++++++++++`);
    console.log(`Shop:${product.shop}`);
    console.log(`Received product: ${JSON.stringify(product)}`);
  }
}
