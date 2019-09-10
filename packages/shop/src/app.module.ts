import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagingModule } from './messging/messaging.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule,MessagingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
