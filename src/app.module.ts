import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
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
  controllers: [],
  providers: [AppGateway, AppService],
})
export class AppModule {}
