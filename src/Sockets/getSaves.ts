import { DB } from '../database';

export function getSaves(socket) {
  socket.on('getSaves', () => {
    var saves = DB.Instance.getSaveList();
    socket.emit('saveList', saves);
  });
}
