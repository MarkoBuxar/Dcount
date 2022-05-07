import { Server, Socket } from 'socket.io';
import { DB } from './database';
import { KBMhooks } from './kbmhooks';
import { Logger } from './Logger/Logger';

export class Client {
  private io: Server;
  private clients = {};
  private static _instance;

  constructor(io) {
    this.io = io;

    if (!Client.Instance) Client._instance = this;

    this.io.on('connection', (socket: Socket) => {
      Logger.Info('client connected, id: ', socket.id);
      this.clients[socket.id] = socket;
      this.initOutlets(socket);
      var currHighest = DB.Instance.getCurrentHighest(DB.CURR_SAVE);
      socket.emit('count', currHighest ? currHighest.value : 0);
      socket.emit('edit', KBMhooks.getEditStatus());
    });
  }

  public static get Instance() {
    return this._instance;
  }

  private initOutlets(socket: Socket) {
    socket.on('test', () => {
      Logger.Info('working');
    });

    socket.on('toggleEdit', () => {
      KBMhooks.toggleEditMode();
    });
  }
}
