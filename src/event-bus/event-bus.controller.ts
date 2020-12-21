import { EventBusService } from './event-bus.service';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';



@Controller('core')
export class EventBusController {
  // constructor(private readonly eventBusService: EventBusService) {}

  // // @EventPattern('test')
  // sendMsg(): void {
  //   this.eventBusService.sendMsg();
  // }

  // addToBus(path): void{
  //   this.eventBusService.addToBus(path);
  // }

}
