import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'exchange1',
          type: 'fanout',
        }
      ],
      uri: 'amqp://localhost:5672'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
