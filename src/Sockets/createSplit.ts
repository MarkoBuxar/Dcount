import { Client } from '../client';
import { Config } from '../Config/Config';
import { DB } from '../database';

export function toggleEdit(socket) {
  socket.on('createSplit', (data) => {
    var splits = DB.Instance.createSplit(data.name, DB.CURR_SAVE);
    Client.Instance.io.emit(
      'splitChartData',
      DB.Instance.getSplitChartData(DB.CURR_SAVE),
    );

    DB.CURR_SPLIT = data.name;
    Config.Instance.Set(Config.Instance.ConfigString + '.split', data.name);

    var currVal = DB.Instance.getCurrentHighestSplit(DB.CURR_SAVE, data.name);
    Client.Instance.io.emit('split', DB.CURR_SPLIT);
    Client.Instance.io.emit('splitCount', currVal ? currVal.s_value : 0);
  });
}
