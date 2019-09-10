import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';

@Injectable()
export class MessagingService {
  constructor(
    private readonly config: ConfigService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  public async publish(
    message: any,
    exchange: string,
    route: string,
  ): Promise<boolean> {
    try {
      await this.amqpConnection.publish(exchange, route, message);
      return true;
    } catch (e) {
      return false;
    }
  }
}
