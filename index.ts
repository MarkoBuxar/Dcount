import { app, BrowserWindow } from 'electron';
import { Client } from './src/client';
import { KBMhooks } from './src/kbmhooks';
import { Server } from './src/server';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    useContentSize: true,
  });

  win.loadURL('http://localhost:3000/');
  win.focus();
};

app.whenReady().then(() => {
  var server = new Server(createWindow);
  var client = new Client(server.io);
  var kbm = new KBMhooks();

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
