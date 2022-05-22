import { Client } from './client';
import { DB } from './database';
import { KBMhooks } from './kbmhooks';
import { Logger } from './Logger/Logger';

export class CountHandler {
  constructor() {}

  public static handleIncrement(modKeys, key) {
    const pressedKeys = [...modKeys, key].join(' ');

    if (KBMhooks.getSavedKeys().join(' ') != pressedKeys) return;

    var split = DB.SPLIT_ENABLED ? DB.CURR_SPLIT : null;

    DB.Instance.createIncident(DB.CURR_SAVE, split);
    this.updateCount();
  }

  public static updateCount() {
    const currHighest = DB.Instance.getCurrentHighest(DB.CURR_SAVE);
    const currHighestSplit = DB.Instance.getCurrentHighestSplit(
      DB.CURR_SAVE,
      DB.CURR_SPLIT,
    );
    Client.Instance.io.emit('count', currHighest ? currHighest.value : 0);
    Client.Instance.io.emit(
      'splitCount',
      currHighestSplit ? currHighestSplit.s_value : 0,
    );
    Client.Instance.io.emit(
      'dayChartData',
      DB.Instance.getDayChartData(DB.CURR_SAVE),
    );
    Client.Instance.io.emit(
      'splitChartData',
      DB.Instance.getSplitChartData(DB.CURR_SAVE),
    );
  }
}
