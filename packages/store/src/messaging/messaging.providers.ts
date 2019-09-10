import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

export const messagingProviders = [
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        exchanges: [
          {
            name: config.QueueExchange,
            type: config.QueueExchangeType,
          },
        ],
        uri: config.QueueUri,
      })
    }),
  ];
