import { Client } from '../client';
import { Config } from '../Config/Config';
import { DB } from '../database';

export function selectSplit(socket) {
  socket.on('selectSplit', (data) => {
    const split = data.split.trim();
    DB.CURR_SPLIT = split;
    Config.Instance.Set(Config.Instance.ConfigString + '.split', split);

    var currVal = DB.Instance.getCurrentHighestSplit(DB.CURR_SAVE, split);
    Client.Instance.io.emit('split', DB.CURR_SPLIT);
    Client.Instance.io.emit('splitCount', currVal ? currVal.s_value : 0);
  });
}
