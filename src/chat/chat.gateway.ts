import { 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class ChatGateway {

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('toServer')  
  handleMessage(
    client: Socket, 
    data: string, 
    // destID: string,
  ): void {
    // this.server.emit('toClient', {
    //   data: data,
    //   // destID: client.id,
    // });
    this.server.emit('toClient', 'hello client');
    console.log(client.id+': '+data + ' ' + new Date().getTime()/1000);
  }
}
