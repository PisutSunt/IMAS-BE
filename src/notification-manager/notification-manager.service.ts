import { ClientProxy, Payload } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationManagerDto } from './dto/create-notification-manager.dto';

@Injectable()
export class NotificationManagerService {

  constructor(@Inject('NOTIFICATION') private kafka: ClientProxy){}
  
  chatReq(req: any){
    this.kafka.emit('gateway', req);
  }

  
}
