import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // Create Kafka client instance
    ClientsModule.register([
      {
        name: 'chat',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'chat',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'chat-consumer-group'
          }
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
