import sqlite from 'better-sqlite3';
import { dbInitHandler } from './dbInitHandler';
import { KBMhooks } from './kbmhooks';
import { Logger } from './Logger/Logger';

export class DB {
  private db;
  private static _instance;
  public static CURR_SAVE = 'def';

  constructor() {
    this.db = sqlite('save.db', { verbose: Logger.Debug });

    const saves = this.db.prepare(
      'CREATE TABLE IF NOT EXISTS saves(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) NOT NULL, hotkeys VARCHAR(255) NOT NULL, start_t TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    );

    const entries = this.db.prepare(
      'CREATE TABLE IF NOT EXISTS entries(id INTEGER PRIMARY KEY AUTOINCREMENT, save INTEGER, value INTEGER NOT NULL, s_value INTEGER, split VARCHAR(30), t TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (save) REFERENCES saves(id))',
    );

    saves.run();
    entries.run();

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
}
