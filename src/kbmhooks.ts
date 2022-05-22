import gkm from 'gkm';
import { Client } from './client';
import { Config } from './Config/Config';
import { CountHandler } from './countHandler';
import { DB } from './database';
import { Logger } from './Logger/Logger';

export class KBMhooks {
  private static modPressed = [];
  private static lastMods = [];
  private static key;
  private static editMode = false;

  constructor() {
    Logger.Info('Initiated KBM handlers');
    this.initHandlers();
  }

  private initHandlers() {
    gkm.events.on('key.pressed', (data) => {
      let modKey = data[0].split(' ')[1];

      if (KBMhooks.modPressed.length == 0) {
        KBMhooks.lastMods = [];
      }

      if (modKey && KBMhooks.modPressed.indexOf(modKey) === -1) {
        KBMhooks.modPressed.push(modKey);
        KBMhooks.lastMods.push(modKey);
        return;
      }

      if (!KBMhooks.getEditStatus()) {
        CountHandler.handleIncrement(KBMhooks.modPressed, data[0]);
        return;
      }

      if (!modKey) {
        KBMhooks.key = data[0];
      }

      Client.Instance.io.emit('hotkeys', KBMhooks.getLocalKeys());
    });

    gkm.events.on('key.released', (data) => {
      let modKey = data[0].split(' ')[1];

      if (modKey) {
        KBMhooks.modPressed.splice(KBMhooks.modPressed.indexOf(modKey), 1);
        return;
      }
    });
  }

  public static toggleEditMode(data?) {
    this.editMode = data ? data : !this.editMode;
    if (this.editMode == false) {
      if (this.getLocalKeys().join(' ') !== this.getSavedKeys().join(' ')) {
        this.saveKeys();
      }
    }
    this.modPressed = [];
    this.updateEditMode();
  }

  public static updateEditMode() {
    Client.Instance.io.emit('edit', KBMhooks.getEditStatus());
  }

  public static getEditStatus() {
    return this.editMode;
  }

  public static getLocalKeys() {
    return [...this.lastMods, this.key];
  }

  public static getSavedKeys() {
    let hotkeys = DB.Instance.getHotkeys(DB.CURR_SAVE);
    if (!hotkeys) return null;
    return JSON.parse(hotkeys.hotkeys);
  }

  public static saveKeys() {
    DB.Instance.saveHotkeys(DB.CURR_SAVE, this.getLocalKeys());
  }
}
