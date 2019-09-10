import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AmqpConnection, RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { AppService } from '../app.service';
import { Product } from '../product';

@Injectable()
export class MessagingService {
  constructor(
    private readonly config: ConfigService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  public async publishMessage(
    message: any,
    exchange?: string,
    route?: string,
  ): Promise<boolean> {
    try {
      await this.amqpConnection.publish(
        exchange ? exchange : this.config.QueueExchange,
        route ? route : this.config.QueueRoute,
        message,
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  @RabbitSubscribe({
    exchange: 'supply.exchange',
    routingKey: 'shop.route',
    queue: 'shop.queue',
  })
  public async pubSubHandler(msg: any) {
    const product = new Product(msg.name);
    console.log(`++++++++++++++++++++++++++++++`);
    console.log(`Shop:${product.shop}`);
    console.log(`Received product: ${JSON.stringify(product)}`);
  }
}
