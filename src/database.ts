import sqlite from 'better-sqlite3';

export class DB {
  private db;
  private static _instance;
  public static CURR_SAVE = 'def';

  constructor() {
    this.db = sqlite('save.db', { verbose: console.log });

    console.log('db initiated');
    const index =
      'CREATE TABLE IF NOT EXISTS saves(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) NOT NULL, start_t TIMESTAMP DEFAULT CURRENT_TIMESTAMP)';
    const table =
      'CREATE TABLE IF NOT EXISTS entries(id INTEGER PRIMARY KEY AUTOINCREMENT, save INTEGER, value INTEGER NOT NULL, t TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (save) REFERENCES saves(id))';

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

  public createIncident(name, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;
    const statement = this.db.prepare(
      'INSERT INTO entries (save, value) VALUES (?, ?)',
    );
    var currVal = this.getCurrentHighest(name, save) || { value: 0 };
    statement.run(save, ++currVal.value);
  }

  private getCurrentSaveID(name) {
    const statement = this.db.prepare('SELECT * FROM saves WHERE name = ?');
    const data = statement.get(name);
    if (!data) return null;

    return data.id;
  }

  public getCurrentHighest(name, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;
    const statement = this.db.prepare(
      'SELECT * FROM entries WHERE save = ? ORDER BY value DESC LIMIT 1',
    );
    const res = statement.get(save);
    console.log(res);
    return res;
  }
}
