import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { ChatHandlerService } from './chat-handler.service';
import { ChatHandlerController } from './chat-handler.controller';

@Module({
  imports: [
    // Create Kafka client instance
    ClientsModule.register([
      {
        name: 'CHAT_HANDLER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'chat-handler',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'create-chat-group'
          }
        }
      }
    ]
    )
  ],
  controllers: [ChatHandlerController],
  providers: [ChatHandlerService]
})
export class ChatHandlerModule {}
