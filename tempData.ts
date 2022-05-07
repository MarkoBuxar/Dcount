export class TempData {
  private count = 0;

  constructor() {}

  public increment() {
    this.count++;
  }

  public getCount() {
    return this.count;
  }
}
