export interface Db<T> {
  saveDB(data: Map<string, T>): void;
  readDB(): null | Map<string, T>;
}
