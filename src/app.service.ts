import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class AppService {

  constructor(@Inject('EVENT_BUS') private eventbus: ClientProxy){}

  addToBus(req: any): void{
    let path = req.path;
    switch(path){
      case 'login':
        this.eventbus.emit('test', 'LOGIN TASK');
        break;
      default:
        console.log('service not found');
        break;
    }
  }
}
