import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AmqpConnection, RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { AppService } from '../app.service';
import { Product } from '../product';

@Injectable()
export class MessagingService {
  constructor() {}

  @RabbitSubscribe({
    exchange: 'supply.exchange',
    routingKey: 'grocery.route',
    queue: 'grocery.queue',
  })
  public async subscribe(msg: any) {
    const product = new Product(msg.name);
    console.log(`VVVVVVVVVVVVVVVVVVVVVVVVVV`);
    console.log(`GROCERY:${product.shop}`);
    console.log(`Received product: ${JSON.stringify(product)}`);
  }
}
