import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { Product } from './product';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Shop App running...';
  }

  @RabbitSubscribe({
    exchange: 'supply_exchange',
    routingKey: 'supply_route',
    queue:  'supply_queue'
  })
  public async pubSubHandler(msg: any) {
    const product = new Product(msg.name);
    console.log(`++++++++++++++++++++++++++++++`);
    console.log(`Shop:${product.shop}`);
    console.log(`Received product: ${JSON.stringify(product)}`);
  }
}
