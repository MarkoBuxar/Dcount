export async function saves(db) {
  const saves = db.prepare(
    'CREATE TABLE IF NOT EXISTS saves(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) NOT NULL, hotkeys VARCHAR(255) NOT NULL, start_t TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
  );

  saves.run();
}
