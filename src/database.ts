import sqlite from 'better-sqlite3';
import { Config } from './Config/Config';
import { dbInitHandler } from './dbInitHandler';
import { KBMhooks } from './kbmhooks';
import { Logger } from './Logger/Logger';

export class DB {
  private db;
  private static _instance;
  public static CURR_SAVE = Config.Instance.Get('save') || 'def';
  public static CURR_SPLIT = Config.Instance.Get('split') || 'def';

  constructor() {
    this.db = sqlite('save.db', { verbose: Logger.Debug });

    new dbInitHandler(this.db).init();

    if (!this.getCurrentSaveID(DB.CURR_SAVE)) {
      this.createNewSave(DB.CURR_SAVE, JSON.stringify(KBMhooks.getSavedKeys()));
    }
    Logger.Info('DB initiated');
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public createNewSave(name, hotkeys) {
    const save = this.db.prepare(
      'INSERT INTO saves (name, hotkeys) VALUES (?, ?)',
    );
    save.run(name, hotkeys);
  }

  public createIncident(name, split?, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;
    const statement = this.db.prepare(
      'INSERT INTO entries (save, value, split, s_value) VALUES (?, ?, ?, ?)',
    );
    var currVal = this.getCurrentHighest(name, split, save) || { value: 0 };

    statement.run(
      save,
      ++currVal.value,
      split,
      currVal.s_value ? ++currVal.s_value : null,
    );
  }

  private getCurrentSaveID(name) {
    try {
      const statement = this.db.prepare('SELECT id FROM saves WHERE name = ?');
      const data = statement.get(name);
      if (!data) return null;

      return data.id;
    } catch (error) {
      Logger.Error(error);
      return null;
    }
  }

  public getCurrentHighest(name, split?, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;
    const statement = this.db.prepare(
      'SELECT value, s_value FROM entries WHERE save = ? ORDER BY value DESC LIMIT 1',
    );
    const res = statement.get(save);
    return res;
  }

  public getCurrentHighestSplit(name, split, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;

    const statement = this.db.prepare(
      'SELECT s_value FROM entries WHERE save = ? AND split = ? ORDER BY value DESC LIMIT 1',
    );

    const res = statement.get(save, split);
    return res;
  }

  public getSplitList(name, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;

    const statement = this.db.prepare(
      'SELECT DISTINCT split FROM entries WHERE save = ? AND split IS NOT NULL',
    );

    const res = statement.all(save);
    return res;
  }

  public createSplit(name, saveName, id?) {
    const save = id || this.getCurrentSaveID(saveName);
    if (!save) return;

    var currVal = this.getCurrentHighest(saveName, null, save) || { value: 0 };

    const statement = this.db.prepare(
      'INSERT INTO entries (save, value, split, s_value) VALUES (?, ?, ?, ?)',
    );

    statement.run(save, currVal.value, name, 0);
  }
}
