import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';

@Injectable()
export class MessagingService {
  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'subscribe-route',
    queue: 'subscribe-queue'
  })
  public async pubSubHandler(msg: {}) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }
}
