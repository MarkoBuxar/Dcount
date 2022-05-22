import { Server, Socket } from 'socket.io';
import { DB } from './database';
import { KBMhooks } from './kbmhooks';
import { Logger } from './Logger/Logger';
import { socketHandler } from './socketHandler';

export class Client {
  public io: Server;
  private clients = {};
  private static _instance: Client;

  constructor(io) {
    this.io = io;

    if (!Client.Instance) Client._instance = this;

    this.io.on('connection', async (socket: Socket) => {
      Logger.Info('client connected, id: ', socket.id);
      this.clients[socket.id] = socket;
      await this.initOutlets(socket);
      Client.initClient(socket);
    });
  }

  public static get Instance() {
    return this._instance;
  }

  private async initOutlets(socket: Socket) {
    let sh = new socketHandler();
    await sh.init(socket);
  }

  public static initClient(socket?) {
    var sock = socket || Client.Instance.io;

    var currHighest = DB.Instance.getCurrentHighest(DB.CURR_SAVE);
    var currHighestSplit = DB.Instance.getCurrentHighestSplit(
      DB.CURR_SAVE,
      DB.CURR_SPLIT,
    );
    sock.emit('save', DB.CURR_SAVE);
    sock.emit('split', DB.CURR_SPLIT);
    sock.emit('splitActive', DB.SPLIT_ENABLED);
    sock.emit('count', currHighest ? currHighest.value : 0);
    sock.emit('splitCount', currHighestSplit ? currHighestSplit.s_value : 0);
    sock.emit('edit', KBMhooks.getEditStatus());
    sock.emit('hotkeys', KBMhooks.getSavedKeys());
    sock.emit('dayChartData', DB.Instance.getDayChartData(DB.CURR_SAVE));
    sock.emit('splitChartData', DB.Instance.getSplitChartData(DB.CURR_SAVE));
  }
}
