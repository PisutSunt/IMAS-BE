import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as event_bus from './common/event-bus.json';

@Injectable()
export class AppService {

  constructor(@Inject('EVENT_BUS') private eventbus: ClientProxy){}

  // Add event to event-bus
  addToBus(req: any): void{
    switch(req.transaction){
      case 'login':
        var topic = event_bus.login.topic
        var payload = event_bus.login.transaction
        break;
      case 'chat-queue':
        var topic = event_bus.queue.topic
        var payload = event_bus.queue.transaction
        payload['payload'] = req.payload
        break;
      default:
        console.log('service not found');
        break;
    }
    this.eventbus.emit(topic, payload);
  }

  
  sendToClient(){
    
  }

}
