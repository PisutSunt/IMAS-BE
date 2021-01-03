import { 
  OnGatewayInit,
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ transport: ['websocket'] })
export class AppGateway implements OnGatewayInit{
  afterInit(server: any) {
    throw new Error('Wait for any idea');
  }

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
