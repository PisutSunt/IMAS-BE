import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as event_bus from './common/event-bus.json';

@Injectable()
export class AppService {

  constructor(@Inject('EVENT_BUS') private eventbus: ClientProxy){}

  // Add event to event-bus
  addToBus(req: any): void{
    let transaction = req.transaction;
    switch(transaction){
      case 'login':
        var payload = event_bus.login.description
        var topic = event_bus.login.topic
        break;
      case 'chat-queue':
        var payload = event_bus.queue.description
        payload['payload'] = req.payload
        var topic = event_bus.queue.topic
        break;
      default:
        console.log('service not found');
        break;
    }
    this.eventbus.emit(topic, payload);
  }
}
