import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ChatQueueService } from './chat-queue.service';

@Controller()
export class ChatQueueController {
  constructor(private readonly chatQueueService: ChatQueueService) {}

  @EventPattern('queue')
  async chatQueueHandler(data: Record<string, unknown>) {
    let user_info = data.value['payload'];
    let user_role = user_info.role;
    
    //
    if( user_role == 'patient' )
    {
      this.chatQueueService.addPatientChatQueue(user_info)
    }
    else if( user_role == 'doctor' )
    {
      this.chatQueueService.addDoctorChatQueue(user_info)
    }
    else
    {
      console.log('user role not found')
    }

  }
  
  
}
