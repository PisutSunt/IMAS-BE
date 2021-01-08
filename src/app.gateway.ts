import { AppService } from './app.service';
import { Inject, Logger } from '@nestjs/common';
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
import { SocketStateService } from './socket-state/socket-state.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  private logger: Logger = new Logger('AppGateWay')
  constructor(private readonly eventBus: AppService, @Inject(SocketStateService) private socketState: SocketStateService) {}

  afterInit(server: Server){
    this.logger.log('initialized')

    // Authentication middleware 
    server.use( async(socket, next) => {
      console.log('socket id:', socket.id);
      console.log('socket auth:', socket.handshake.auth);

      // Receive token
      let token = socket.handshake.auth;
      
      // Check if user is authencated
      if(token == null){
        next();
      }
      else{

        // Send reqest to authentication service
        // authenService(token)

        // Register new socket
        this.socketState.add('userid', socket);
        next();
      }
      
    });
  }

  handleConnection(client: Socket, ... args: any[]){
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket){
    this.logger.log(`Client disconected: ${client.id}`);
    // Remove registered socket when disconnected
    this.socketState.remove('userid', client);
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
