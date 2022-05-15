// runs commands out of sync, shelved until further notice

import fs from 'fs';
import Path from 'path';

export class dbInitHandler {
  constructor() {}

  public async init(db) {
    const socketDir = Path.join(__dirname, 'Tables');

    const socketFiles = fs.readdirSync(socketDir).filter((file) => {
      return file.endsWith('.ts') || file.endsWith('.js');
    });

    socketFiles.forEach(async (file) => {
      const im = await import(Path.join(socketDir, file));
      for (const key in im) {
        await im[key](db);
      }
    });
  }
}
