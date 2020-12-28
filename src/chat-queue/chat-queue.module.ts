import { Module } from '@nestjs/common';
import { ChatQueueService } from './chat-queue.service';
import { ChatQueueController } from './chat-queue.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // Create Kafka client instance
    ClientsModule.register([
      {
        name: 'CHAT_QUEUE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'chat-queue',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'chat-queue-consumer-group'
          }
        }
      }
    ]
    )
  ],
  controllers: [ChatQueueController],
  providers: [ChatQueueService]
})
export class ChatQueueModule {}
