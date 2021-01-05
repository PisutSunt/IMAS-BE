import { ConnectedSocket, OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'

class Info {
  clientId = '';
  constructor(clientId: string) {
    this.clientId = clientId;
  }
}

@WebSocketGateway({ transport: ['websocket'] })
export class AppGateway {

  clients = [];
  @WebSocketServer()
  server: Server;

  // Assume this is recieve 2 socket from event bus
  // afterInit(client: any, ...args: any[]) {
  //   if(this.clients.length == 2) {
  //     console.log('MATCHED!');
  //     this.server.to(this.clients[0].clientId).emit('startChat', {
  //       interlocutor: this.clients[1].clientId,
  //     });
  //     this.server.to(this.clients[1].clientId).emit('startChat', this.clients[0].clientId);
  //   }
  // }

  @SubscribeMessage('storeClientInfo')
  handleEvent(
    @ConnectedSocket() client: Socket,
  ): void {
      var clientInfo = new Info(client.id);
      this.clients.push(clientInfo);
      console.log(`client connected: ${client.id}`);
      if(this.clients.length % 2 == 0 && this.clients.length > 0) {
        console.log('MATCHED!');
        this.server.to(this.clients[this.clients.length-1].clientId).emit('startChat', this.clients[this.clients.length-2].clientId);
        this.server.to(this.clients[this.clients.length-2].clientId).emit('startChat', this.clients[this.clients.length-1].clientId);
      }
  }

  @SubscribeMessage('toServer')
  handleMessage(
    client: Socket, 
    data: {
      message: string,
      destId: string,
    },
  ): void {
    console.log(client.id+': '+ data.message + ' ' + new Date().getTime()/1000 + ' to: ' + data.destId);
    try{
      this.server.to(this.clients[0]).emit('toClient', {
        'message': data.message,
        'destId': client.id,
      });
    }catch(e){
      console.log(e);
      
    }
    
  }
}
