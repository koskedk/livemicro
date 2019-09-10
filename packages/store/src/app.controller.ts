import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './product';
import { ConfigService } from './config/config.service';
import { MessagingService } from './messaging/messaging.service';

@Controller()
export class AppController {
  constructor(
    private readonly config: ConfigService,
    private readonly messagingService: MessagingService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/send')
  public async publishMessage(@Body() product: Product) {
    const queue = this.config.QueueRoutes.find(x => x.includes(product.type));
    const result = await this.messagingService.publish(
      product,
      this.config.QueueExchange,
      queue,
    );
    if (result) {
      console.log(`=== SENT TO ${product.type} || ${queue} ===`);
      return {
        result: `Product ${product.name} Supplied !`,
      };
    } else {
      console.error('error');
    }
  }
}
