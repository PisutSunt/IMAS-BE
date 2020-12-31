import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ChatHandlerService } from './chat-handler.service';

@Controller()
export class ChatHandlerController {
  constructor(private readonly chatHandlerService: ChatHandlerService) {}

  // @EventPattern('patient-chat-queue')
  // async patientQueueHandler() {
  //   console.log("incoming patient req 1")
  //   await this.chatHandlerService.waitDoctorAccept()
  //   this.chatHandlerService.createChat()
  // }

  // @EventPattern('doctor-chat-queue')
  // async doctorQueueHandler() {
  //   console.log("incoming doctor req 1")
  //   await this.chatHandlerService.waitPatientRequest()
  //   this.chatHandlerService.createChat()
  // }
  

}
