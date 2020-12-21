import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventBusModule } from './event-bus/event-bus.module';
import { AppGateway } from './app.gateway';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [EventBusModule,
   // Bind Kafka server and Nestjs together
   ClientsModule.register([
    {
      name: 'EVENT_BUS',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'event',
          brokers: ['localhost:9092'],
        }
      }
    },
  ]),
  ],
  controllers: [AppController],
  providers: [AppGateway, AppService],
})
export class AppModule {}
