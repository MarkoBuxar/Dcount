import {
  editMode,
  count,
  splitList,
  save,
  splitCount,
  split,
  splitActive,
  hotkeys,
  saveList,
  dayChartData,
  splitChartData,
} from './Stores';

export class sockets {
  public socket;
  private static _instance: sockets;

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
      editMode.set(data);
    });

    this.socket.on('splitList', (data) => {
      splitList.set(data);
    });

    this.socket.on('saveList', (data) => {
      saveList.set(data);
    });

    this.socket.on('splitActive', (data) => {
      splitActive.set(data);
    });

    this.socket.on('hotkeys', (data) => {
      hotkeys.set(data);
    });

    this.socket.on('dayChartData', (data) => {
      dayChartData.set(data);
    });

    this.socket.on('splitChartData', (data) => {
      splitChartData.set(data);
    });
  }
}
