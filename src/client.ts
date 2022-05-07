import { Server, Socket } from 'socket.io';
import { Logger } from './Logger/Logger';

export class Client {
  private io: Server;
  private clients = {};

  constructor(io) {
    this.io = io;

    this.io.on('connection', (socket: Socket) => {
      Logger.Info('client connected, id: ', socket.id);
      this.clients[socket.id] = socket;
      this.initOutlets(socket);
    });
  }

  private initOutlets(socket: Socket) {
    socket.on('test', () => {
      Logger.Info('working');
    });
  }
}
