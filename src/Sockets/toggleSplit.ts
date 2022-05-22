import { Config } from '../Config/Config';
import { DB } from '../database';

export function toggleSplit(socket) {
  socket.on('toggleSplit', (data) => {
    DB.SPLIT_ENABLED = data.state;
    Config.Instance.Set(
      Config.Instance.ConfigString + '.splitActive',
      data.state,
    );
  });
}
