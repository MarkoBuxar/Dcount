import { Client } from '../client';
import { Config } from '../Config/Config';
import { DB } from '../database';

export function createSplit(socket) {
  socket.on('createSplit', (data) => {
    const split = data.name.trim();

    var splits = DB.Instance.createSplit(split, DB.CURR_SAVE);
    Client.Instance.io.emit(
      'splitChartData',
      DB.Instance.getSplitChartData(DB.CURR_SAVE),
    );

    DB.CURR_SPLIT = split;
    Config.Instance.Set(Config.Instance.ConfigString + '.split', split);

    var currVal = DB.Instance.getCurrentHighestSplit(DB.CURR_SAVE, split);
    Client.Instance.io.emit('split', DB.CURR_SPLIT);
    Client.Instance.io.emit('splitCount', currVal ? currVal.s_value : 0);
  });
}
