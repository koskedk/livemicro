import { Module } from '@nestjs/common';
import { messagingProviders } from './messaging.providers';
import { MessagingService } from './messaging.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [...messagingProviders,ConfigModule],
  exports: [...messagingProviders]
})
export class MessagingModule {}
