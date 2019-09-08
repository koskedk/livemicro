import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';

@Controller()
export class AppController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
