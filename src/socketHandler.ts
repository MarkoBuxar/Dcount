import fs from 'fs';
import Path from 'path';

export class socketHandler {
  constructor() {}

  public async init(socket) {
    const socketDir = Path.join(__dirname, 'Sockets');

    const socketFiles = fs.readdirSync(socketDir).filter((file) => {
      return file.endsWith('.ts') || file.endsWith('.js');
    });

    socketFiles.forEach(async (file) => {
      const im = await import(Path.join(socketDir, file));
      for (const key in im) {
        im[key](socket);
      }
    });
  }
}
