import { Client } from '../client';
import { Config } from '../Config/Config';
import { DB } from '../database';

export function createSave(socket) {
  socket.on('createSave', (data) => {
    const name = data.name.trim();

    let hotkeys = DB.Instance.getHotkeys(DB.CURR_SAVE);

    var save = DB.Instance.createSave(name, hotkeys.hotkeys);

    DB.CURR_SAVE = name;
    Config.Instance.Set('save', name);

    var split = Config.Instance.Get(Config.Instance.ConfigString);

    DB.CURR_SPLIT = split && split.split ? split.split.trim() : null;
    DB.SPLIT_ENABLED = split && split.splitActive ? split.splitActive : false;

    Client.initClient();
  });
}
