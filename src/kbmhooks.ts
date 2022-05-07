import gkm from 'gkm';
import { Client } from './client';
import { Config } from './Config/Config';
import { CountHandler } from './countHandler';

export class KBMhooks {
  private static modPressed = [];
  private static key;
  private static editMode = false;

  constructor(client) {
    this.initHandlers();
  }

  private initHandlers() {
    gkm.events.on('key.pressed', (data) => {
      let modKey = data[0].split(' ')[1];

      if (modKey && KBMhooks.modPressed.indexOf(modKey) === -1) {
        KBMhooks.modPressed.push(modKey);
        return;
      }

      if (!KBMhooks.getEditStatus()) {
        CountHandler.handleIncrement(KBMhooks.modPressed, data[0]);
        return;
      }

      if (!modKey) {
        KBMhooks.key = data[0];
      }
    });

    gkm.events.on('key.released', (data) => {
      let modKey = data[0].split(' ')[1];

      if (modKey) {
        KBMhooks.modPressed.splice(KBMhooks.modPressed.indexOf(modKey), 1);
        return;
      }
    });
  }

  public static toggleEditMode() {
    this.editMode = !this.editMode;
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
    return [...this.modPressed, this.key];
  }

  public static getSavedKeys() {
    return Config.Instance.Get('hotkeys');
  }

  public static saveKeys() {
    Config.Instance.Set('hotkeys', this.getLocalKeys());
  }
}
