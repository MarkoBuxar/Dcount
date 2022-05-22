import { DB } from '../database';

export function createSave(socket) {
  socket.on('createSave', (data) => {
    let hotkeys = DB.Instance.getHotkeys(DB.CURR_SAVE);

    var save = DB.Instance.createSave(data.name, hotkeys.hotkeys);
  });
}
