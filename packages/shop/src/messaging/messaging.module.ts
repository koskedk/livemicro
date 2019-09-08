import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { MessagingService } from './messaging.service';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic'
        }
      ],
      uri: 'amqp://localhost:5672'
    }),
    MessagingModule
  ],
  providers: [MessagingService],
})
export class MessagingModule {}
