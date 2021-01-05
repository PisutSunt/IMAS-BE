import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { NotificationManagerService } from './notification-manager.service';
import { NotificationManagerController } from './notification-manager.controller';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'NOTIFICATION',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'notification-manager',
          brokers: ['localhost:9092']
        }
      }
    }])
  ],
  controllers: [NotificationManagerController],
  providers: [NotificationManagerService]
})
export class NotificationManagerModule {}
