import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationManagerService } from './notification-manager.service';

@Controller()
export class NotificationManagerController {
  constructor(private readonly notificationManagerService: NotificationManagerService) {}

  @EventPattern('notification-manager')
  notiHandler(req: Record<string, unknown>){

    switch(req.transaction){
      case 'noti-doc-to-accept':
        this.notificationManagerService.chatReq(req);
        break;
      case 'noti-vital':
        break;
      case 'noti-room-created':
        break;
      case 'noti-appointment':
        break;
      case 'noti-register':
        break;
      default:
        break;
    }
  }

}
