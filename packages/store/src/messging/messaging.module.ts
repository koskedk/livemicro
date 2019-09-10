import { Module } from '@nestjs/common';
import { messagingProviders } from './messaging.providers';

@Module({
  imports: [...messagingProviders],
  exports: [...messagingProviders],
})
export class MessagingModule {}
