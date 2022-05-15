import { Server, Socket } from 'socket.io';
import { DB } from './database';
import { KBMhooks } from './kbmhooks';
import { Logger } from './Logger/Logger';
import { socketHandler } from './socketHandler';

export class Client {
  private io: Server;
  private clients = {};
  private static _instance;

  constructor(io) {
    this.io = io;

    if (!Client.Instance) Client._instance = this;

    this.io.on('connection', async (socket: Socket) => {
      Logger.Info('client connected, id: ', socket.id);
      this.clients[socket.id] = socket;
      await this.initOutlets(socket);
      var currHighest = DB.Instance.getCurrentHighest(DB.CURR_SAVE);
      socket.emit('count', currHighest ? currHighest.value : 0);
      socket.emit('edit', KBMhooks.getEditStatus());
    });
  }

  public static get Instance() {
    return this._instance;
  }

  private async initOutlets(socket: Socket) {
    let sh = new socketHandler();
    await sh.init(socket);
  }
}
