import { editMode, count, splitList, save, splitCount, split } from './Stores';

export class sockets {
  public socket;
  private static _instance;

  constructor(io) {
    if (!sockets._instance) sockets._instance = this;

    this.socket = io();
  }

  public static get Instance() {
    return this._instance;
  }

  public init() {
    this.socket.on('save', (data) => {
      save.set(data);
    });

    this.socket.on('split', (data) => {
      split.set(data);
    });

    this.socket.on('count', (data) => {
      count.set(data);
    });

    this.socket.on('splitCount', (data) => {
      splitCount.set(data);
    });

    this.socket.on('edit', (data) => {
      this.updateEditStatus(data);
    });

    this.socket.on('splitList', (data) => {
      this.updateSplitList(data);
    });
  }

  private updateEditStatus(data) {
    editMode.set(data);
  }

  private updateSplitList(data) {
    splitList.set(data);
  }
}
