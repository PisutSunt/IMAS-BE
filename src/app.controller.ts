import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly eventBusService: AppService) {}

  addToBus(path): void{
    this.eventBusService.addToBus(path);
  }

}
