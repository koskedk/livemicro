import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { MessagingModule } from './messging/messaging.module';
import { ConfigModule } from './config/config.module';
import { MessagingService } from './messging/messaging.service';

@Module({
  imports: [ConfigModule, MessagingModule],
  controllers: [AppController],
  providers: [AppService,MessagingService],
})
export class AppModule {}

