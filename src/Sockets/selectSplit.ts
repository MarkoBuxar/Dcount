import { Config } from '../Config/Config';
import { DB } from '../database';

export function toggleEdit(socket) {
  socket.on('selectSplit', (data) => {
    Config.Instance.Set('split', data.split);
    DB.CURR_SPLIT = data.split;

    var currVal = DB.Instance.getCurrentHighestSplit(DB.CURR_SAVE, data.split);

    socket.emit('split', DB.CURR_SPLIT);
    socket.emit('splitCount', currVal ? currVal.s_value : 0);
  });
}
