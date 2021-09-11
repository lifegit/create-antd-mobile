import LocalStorageManager from '../LocalStorageManager';

export default class BaseStorage {
  private readonly key: any;
  private readonly us: LocalStorageManager;

  constructor(key: any) {
    this.key = key;
    this.us = new LocalStorageManager();
  }

  public set(val: any) {
    this.us.setItem(this.key, val);
  }
  public get(): any {
    return this.us.getItem(this.key);
  }
}
