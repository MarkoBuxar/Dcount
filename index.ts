import { app, BrowserWindow } from 'electron';
import { Client } from './src/client';
import { DB } from './src/database';
import { KBMhooks } from './src/kbmhooks';
import { Server } from './src/server';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 550,
    autoHideMenuBar: true,
    useContentSize: true,
  });

  win.loadURL('http://localhost:3000/');
  win.focus();
};

app.whenReady().then(() => {
  const server = new Server(createWindow);
  const client = new Client(server.io);
  const kbm = new KBMhooks();
  const database = new DB();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
