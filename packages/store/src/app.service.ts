import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Store App Running!';
  }
}
