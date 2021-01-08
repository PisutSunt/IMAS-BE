import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketStateService {

    // Attribute used for recording users' socket
    private socketState = new Map<string, Socket[]>()

    // Register new user socket
    public add(userId: string, socket: Socket): boolean{
        const existingSockets = this.socketState.get(userId) || []

        const sockets = [...existingSockets, socket]
        
        this.socketState.set(userId, sockets)

        return true
    }

    // Remove registered userid when disconnected
    public remove(userId: string, socket: Socket): boolean {
        const existingSockets = this.socketState.get(userId)
     
        if (!existingSockets) {
          return true
        }
     
        const sockets = existingSockets.filter(s => s.id !== socket.id)
     
        if (!sockets.length) {
          this.socketState.delete(userId)
        } else {
          this.socketState.set(userId, sockets)
        }
     
        return true
    }

    // Get registered sockets for particular userid
    public get(userId: string): Socket[] {
        return this.socketState.get(userId) || []
      }
     
    // Get all registered sockets 
    public getAll(): Socket[] {
        const all = []
        
        this.socketState.forEach(sockets => all.push(sockets))
        
        return all
    }
     

}
