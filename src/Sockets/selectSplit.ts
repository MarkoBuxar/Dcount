import { Client } from '../client';
import { Config } from '../Config/Config';
import { DB } from '../database';

export function selectSplit(socket) {
  socket.on('selectSplit', (data) => {
    DB.CURR_SPLIT = data.split;
    Config.Instance.Set(Config.Instance.ConfigString + '.split', data.split);

    var currVal = DB.Instance.getCurrentHighestSplit(DB.CURR_SAVE, data.split);
    Client.Instance.io.emit('split', DB.CURR_SPLIT);
    Client.Instance.io.emit('splitCount', currVal ? currVal.s_value : 0);
  });
}
