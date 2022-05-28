import { Client } from '../client';
import { Config } from '../Config/Config';
import { DB } from '../database';

export function createSave(socket) {
  socket.on('createSave', (data) => {
    let hotkeys = DB.Instance.getHotkeys(DB.CURR_SAVE);

    var save = DB.Instance.createSave(data.name, hotkeys.hotkeys);

    DB.CURR_SAVE = data.name;
    Config.Instance.Set('save', data.name);

    var split = Config.Instance.Get(Config.Instance.ConfigString);

    DB.CURR_SPLIT = split && split.split ? split.split : null;
    DB.SPLIT_ENABLED = split && split.splitActive ? split.splitActive : false;

    Client.initClient();
  });
}
