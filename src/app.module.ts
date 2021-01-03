import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { AppGateway } from './app.gateway';

@Module({
  imports: [ChatModule],
  controllers: [],
  providers: [ChatGateway, AppGateway],
})
export class AppModule {}
