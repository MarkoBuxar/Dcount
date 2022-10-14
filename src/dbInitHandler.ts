// runs commands out of sync, shelved until further notice

/* import fs from 'fs';
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
} */

export class dbInitHandler {
  private db;

  constructor(db) {
    this.db = db;
  }

  public init() {
    const saves = this.db.prepare(
      'CREATE TABLE IF NOT EXISTS saves(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) NOT NULL, hotkeys VARCHAR(255) NOT NULL, start_t TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    );

    const entries = this.db.prepare(
      'CREATE TABLE IF NOT EXISTS entries(id INTEGER PRIMARY KEY AUTOINCREMENT, save INTEGER, value INTEGER NOT NULL, s_value INTEGER, split VARCHAR(30), t TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (save) REFERENCES saves(id))',
    );

    saves.run();
    entries.run();
  }
}
