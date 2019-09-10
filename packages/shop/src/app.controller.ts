import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AmqpConnection, RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { Product } from './product';
import { ConfigService } from './config/config.service';

@Controller()
export class AppController {
  constructor(
    private readonly config:ConfigService,
    private readonly amqpConnection: AmqpConnection,
    private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }




}
