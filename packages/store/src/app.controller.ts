import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './product';
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

  @Post('/send')
  public async publishMessage(@Body() product: Product) {
    await this.amqpConnection.publish(
      'exchange1',
      'subscribe-route',
      product
    );
    console.log('=== SENT TO STORES ===')
    return {
      result: `Product ${product.name} Supplied !`,
    };
  }
}
