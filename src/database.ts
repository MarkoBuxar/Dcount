import sqlite from 'better-sqlite3';
import { Logger } from './Logger/Logger';

export class DB {
  private db;
  private static _instance;
  public static CURR_SAVE = 'def';

  constructor() {
    this.db = sqlite('save.db', { verbose: Logger.Debug });

    Logger.Info('DB initiated');
    const index =
      'CREATE TABLE IF NOT EXISTS saves(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) NOT NULL, start_t TIMESTAMP DEFAULT CURRENT_TIMESTAMP)';
    const table =
      'CREATE TABLE IF NOT EXISTS entries(id INTEGER PRIMARY KEY AUTOINCREMENT, save INTEGER, value INTEGER NOT NULL, s_value INTEGER, split VARCHAR(30), t TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (save) REFERENCES saves(id))';

    this.db.exec(index);
    this.db.exec(table);

    if (!this.getCurrentSaveID(DB.CURR_SAVE)) {
      this.createNewSave(DB.CURR_SAVE);
    }
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public createNewSave(name) {
    const save = this.db.prepare('INSERT INTO saves (name) VALUES (?)');
    save.run(name);
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
    const statement = this.db.prepare('SELECT id FROM saves WHERE name = ?');
    const data = statement.get(name);
    if (!data) return null;

    return data.id;
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
