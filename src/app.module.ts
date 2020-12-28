import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ChatQueueModule } from './chat-queue/chat-queue.module';

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
  ],
  controllers: [],
  providers: [AppGateway, AppService],
})
export class AppModule {}
