import { Client } from './client';
import { DB } from './database';
import { KBMhooks } from './kbmhooks';

export class CountHandler {
  constructor() {}

  public static handleIncrement(modKeys, key) {
    const pressedKeys = [...modKeys, key].join(' ');

    if (KBMhooks.getSavedKeys().join(' ') != pressedKeys) return;

    DB.Instance.createIncident(DB.CURR_SAVE);
    this.updateCount();
  }

  public static updateCount() {
    var currHighest = DB.Instance.getCurrentHighest(DB.CURR_SAVE);
    Client.Instance.io.emit('count', currHighest ? currHighest.value : 0);
  }
}
