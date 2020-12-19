import { 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'

@WebSocketGateway(80, { namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('toServer')
  handleMessage(
    client: Socket, 
    data: string, 
    destID: string,
  ): void {
    this.server.to(destID).emit('toClient', {
      data: data,
      destID: client.id,
    });
  }
}
