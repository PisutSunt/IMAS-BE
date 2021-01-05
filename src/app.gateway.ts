import { AppService } from './app.service';
import { Logger } from '@nestjs/common';
import { 
  MessageBody, 
  ConnectedSocket, 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  OnGatewayInit, 
  SubscribeMessage, 
  WebSocketGateway 
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { EventPattern } from '@nestjs/microservices';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  private logger: Logger = new Logger('AppGateWay')
  constructor(private readonly eventBus: AppService) {}

  afterInit(server: Server){
    this.logger.log('initialized')
  }

  handleConnection(client: Socket, ... args: any[]){
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket){
    this.logger.log(`Client disconected: ${client.id}`)
  }

  @SubscribeMessage('event')
  handleMessage(
    @MessageBody() payload: string,
    @ConnectedSocket() client: Socket): void {
    this.eventBus.addToBus(payload);
  }

  @EventPattern('gateway')
  sendBack(): void{
    this.eventBus.sendToClient();
  }
  
}
