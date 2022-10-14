export async function entries(db) {
  const entries = db.prepare(
    'CREATE TABLE IF NOT EXISTS entries(id INTEGER PRIMARY KEY AUTOINCREMENT, save INTEGER, value INTEGER NOT NULL, s_value INTEGER, split VARCHAR(30), t TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (save) REFERENCES saves(id))',
  );

  entries.run();
}
