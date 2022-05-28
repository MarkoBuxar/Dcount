import { Client } from '../client';
import { Config } from '../Config/Config';
import { DB } from '../database';

export function selectSave(socket) {
  socket.on('selectSave', (data) => {
    DB.CURR_SAVE = data.save.trim();
    Config.Instance.Set('save', data.save);

    var split = Config.Instance.Get(Config.Instance.ConfigString);

    DB.CURR_SPLIT = split && split.split ? split.split : null;
    DB.SPLIT_ENABLED = split && split.splitActive ? split.splitActive : false;

    Client.initClient();
  });
}
