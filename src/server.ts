import express from 'express';
import path from 'path';
import * as http from 'http';
import { Server as IO } from 'socket.io';
import { Logger } from './Logger/Logger';
import { Config } from './Config/Config';

const BASE_PATH = path.join(__dirname, '..');

export class Server {
  public static port = Config.dev ? 3000 : 34206;
  private app;
  private server;
  public io;

  constructor(callback) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new IO(this.server);

    this.initRoutes();
    this.init(callback);
  }

  private init(callback) {
    this.server.listen(Server.port, () => {
      Logger.Success('Server started on port ' + Server.port);
      callback();
    });
  }

  private initRoutes() {
    this.app.use(express.static(path.join(BASE_PATH, 'ui')));

    this.app.get('*', (req, res) => {
      res.sendFile(path.join(BASE_PATH, 'ui', 'index.html'));
    });
  }
}
