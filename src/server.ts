import express from 'express';
import path from 'path';
import * as http from 'http';
import { Server as IO, Socket } from 'socket.io';
import { Logger } from './Logger/Logger';

const BASE_PATH = path.join(__dirname, '..');

export class Server {
  private port = 3000;
  private app;
  private server;
  public io;

  constructor(callback) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new IO(this.server);

    this.init(callback);
  }

  private init(callback) {
    this.app.use(express.static(path.join(BASE_PATH, 'ui')));

    this.app.get('/', (req, res) => {
      res.sendFile(path.join(BASE_PATH, 'ui', 'index.html'));
    });

    this.server.listen(this.port, () => {
      Logger.Success('Server started on port ' + this.port);
      callback();
    });
  }
}
