import sqlite from 'better-sqlite3';
import { Config } from './Config/Config';
import { dbInitHandler } from './dbInitHandler';
import { KBMhooks } from './kbmhooks';
import { Logger } from './Logger/Logger';
import moment from 'moment';

export class DB {
  private db;
  private static _instance: DB;
  public static CURR_SAVE = Config.Instance.Get('save') || 'def';
  public static CURR_SPLIT =
    Config.Instance.Get(Config.Instance.ConfigString + '.split') || null;
  public static SPLIT_ENABLED =
    Config.Instance.Get(Config.Instance.ConfigString + '.splitActive') || false;

  constructor() {
    this.db = sqlite('save.db', { verbose: Logger.Debug });

    new dbInitHandler(this.db).init();

    if (!this.getCurrentSaveID(DB.CURR_SAVE)) {
      this.createSave(DB.CURR_SAVE, JSON.stringify(['A']));
    }
    Logger.Info('DB initiated');
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public createSave(name, hotkeys) {
    console.log(name);
    console.log(hotkeys);
    const save = this.db.prepare(
      'INSERT INTO saves (name, hotkeys) VALUES (?, ?)',
    );
    console.log('statement prepared');

    save.run(name, hotkeys);
    console.log('done');
    //DB.CURR_SAVE = name;
  }

  public createIncident(name, split?, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;
    const statement = this.db.prepare(
      'INSERT INTO entries (save, value, split, s_value) VALUES (?, ?, ?, ?)',
    );
    const currVal = this.getCurrentHighest(name, save) || { value: 0 };
    const currSplitVal = this.getCurrentHighestSplit(name, split, save);

    statement.run(
      save,
      ++currVal.value,
      split,
      currSplitVal ? ++currSplitVal.s_value : null,
    );
  }

  public createSplit(name, saveName, id?) {
    const save = id || this.getCurrentSaveID(saveName);
    if (!save) return;

    var currVal = this.getCurrentHighest(saveName, save) || { value: 0 };

    const statement = this.db.prepare(
      'INSERT INTO entries (save, value, split, s_value) VALUES (?, ?, ?, ?)',
    );

    statement.run(save, currVal.value, name, 0);
  }

  public saveHotkeys(name, hotkeys, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;

    const statement = this.db.prepare(
      'UPDATE saves SET hotkeys = ? WHERE id = ?',
    );

    statement.run(JSON.stringify(hotkeys), save);
  }

  public getCurrentHighest(name, id?) {
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
      'SELECT s_value FROM entries WHERE save = ? AND split IS ? ORDER BY s_value DESC LIMIT 1',
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

  public getSaveList() {
    const statement = this.db.prepare('SELECT DISTINCT name FROM saves');

    const res = statement.all();
    return res;
  }

  public getHotkeys(name, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;

    const statement = this.db.prepare('SELECT hotkeys FROM saves WHERE id = ?');

    const res = statement.get(save);
    return res;
  }

  public getDayChartData(name, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;

    const statement = this.db.prepare(
      "SELECT STRFTIME('%d-%m-%Y', t, 'localtime') AS day, COUNT(DISTINCT value) AS value FROM entries WHERE save = ? GROUP BY day ORDER BY COUNT(value) DESC",
    );

    const data = statement.all(save);

    if (!data) return null;

    let chartData = {
      labels: [],
      datasets: [{ name: 'deaths', values: [] }],
    };

    data.forEach((element) => {
      let date = moment(element.day, 'DD-MM-YYYY').format('MMMM Do YYYY');
      chartData.labels.push(date);
      chartData.datasets[0].values.push(element.value);
    });

    return chartData;
  }

  public getSplitChartData(name, id?) {
    const save = id || this.getCurrentSaveID(name);
    if (!save) return;

    const statement = this.db.prepare(
      "SELECT DISTINCT split, MAX(s_value) AS value, DATE(t, 'localtime') AS day FROM entries WHERE save = ? AND split IS NOT NULL GROUP BY split",
    );

    const data = statement.all(save);

    let chartData = {
      labels: [],
      datasets: [{ name: 'deaths', values: [] }],
    };

    data.forEach((element) => {
      //let date = moment(element.day, 'DD-MM-YYYY').format('MMMM Do YYYY');
      chartData.labels.push(element.split);
      chartData.datasets[0].values.push(element.value);
    });

    return chartData;
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
}
