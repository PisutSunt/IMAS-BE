import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventBusService {
  
  // constructor(@Inject('EVENT_BUS') private eventbus: ClientProxy){}

  // sendMsg(): void {
  //   let data = 'Hello world from NestJS (test)';
  //   const TOPIC = 'test';

  //   // Emit event to Kafka queue
  //   this.eventbus.emit(TOPIC, data);

  // }

  // addToBus(req: any): void{
  //   let path = req.path;
  //   switch(path){
  //     case 'login':
  //       console.log('new service event')
  //       this.eventbus.emit('test', 'LOGIN TASK');
  //     default:
  //       console.log('service not found');
  //   }
  // }

}
