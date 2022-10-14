import { DB } from '../database';

export function getSplits(socket) {
  socket.on('getSplits', () => {
    var splits = DB.Instance.getSplitList(DB.CURR_SAVE);

    socket.emit('splitList', splits);
  });
}
