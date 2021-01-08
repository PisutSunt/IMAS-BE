import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ChatQueueModule } from './chat-queue/chat-queue.module';
import { ChatHandlerModule } from './chat-handler/chat-handler.module';
import { NotificationManagerModule } from './notification-manager/notification-manager.module';
import { SocketStateService } from './socket-state/socket-state.service';

@Module({
  imports: [
  // Create Kafka client instance
   ClientsModule.register([
    {
      name: 'EVENT_BUS',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'event-bus',
          brokers: ['localhost:9092'],
        }
      }
    },
  ]),
   ChatQueueModule,
   ChatHandlerModule,
   NotificationManagerModule,
  ],
  controllers: [],
  providers: [AppGateway, AppService, SocketStateService],
})
export class AppModule {}
