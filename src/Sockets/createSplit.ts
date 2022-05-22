import { Client } from '../client';
import { DB } from '../database';

export function toggleEdit(socket) {
  socket.on('createSplit', (data) => {
    var splits = DB.Instance.createSplit(data.name, DB.CURR_SAVE);
    Client.Instance.io.emit(
      'splitChartData',
      DB.Instance.getSplitChartData(DB.CURR_SAVE),
    );
  });
}
