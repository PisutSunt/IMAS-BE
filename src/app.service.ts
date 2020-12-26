import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as event_bus from './common/event-bus.json';

@Injectable()
export class AppService {

  constructor(@Inject('EVENT_BUS') private eventbus: ClientProxy){}

  addToBus(req: any): void{
    let transaction = req.transaction;
    switch(transaction){
      case 'login':
        this.eventbus.emit(event_bus.login.topic, event_bus.login.description);
        break;
      default:
        console.log('service not found');
        break;
    }
  }
}
