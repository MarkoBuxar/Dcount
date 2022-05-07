import gkm from 'gkm';
import { Logger } from './Logger/Logger';

export class KBMhooks {
  private static modPressed = [];
  public static key;

  constructor() {
    this.initHandlers();
  }

  private initHandlers() {
    gkm.events.on('key.pressed', (data) => {
      let modKey = data[0].split(' ')[1];

      if (modKey && KBMhooks.modPressed.indexOf(modKey) === -1) {
        KBMhooks.modPressed.push(modKey);
        return;
      }

      if (!modKey) {
        KBMhooks.key = data;
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
}
