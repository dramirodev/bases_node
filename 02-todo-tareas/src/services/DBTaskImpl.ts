import fs from "fs";
import Task from "../models/Task";
import {Database} from "../interfaces/Database";

export class DBTaskImpl implements Database<Task> {

  static FILE_NAME = process.env.DB_FILE_NAME || './db/db.json';
  static DIRECTORY = process.env.DB_DIRECTORY || './db';
  saveDB = (data: Map<string, Task>): void => {
    if (!fs.existsSync(DBTaskImpl.DIRECTORY)) {
      fs.mkdirSync(DBTaskImpl.DIRECTORY, { recursive: true });
    }
    fs.writeFileSync(DBTaskImpl.FILE_NAME, JSON.stringify(Object.fromEntries(data)));
  };

  readDB = (): null | Map<string, Task> => {
    if (!fs.existsSync(DBTaskImpl.FILE_NAME)) {
      return null;
    }
    const data = fs.readFileSync(DBTaskImpl.FILE_NAME, {encoding: 'utf-8'});
    return new Map(Object.entries(JSON.parse(data)));
  };
}
