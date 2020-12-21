import { EventBusService } from './event-bus.service';
import { EventBusController } from './event-bus.controller';
import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
    imports: [
        // // Bind Kafka server and Nestjs together
        // ClientsModule.register([
        //   {
        //     name: 'EVENT_BUS',
        //     transport: Transport.KAFKA,
        //     options: {
        //       client: {
        //         clientId: 'event',
        //         brokers: ['localhost:9092'],
        //       }
        //     }
        //   },
        // ]),
      ],
    controllers: [EventBusController],
    providers: [EventBusService],
    exports: [EventBusService]
})
export class EventBusModule {}
