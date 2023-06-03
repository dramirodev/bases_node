import fs from "fs";
import Task from "../models/Task";
import {Db} from "../interfaces/Db";

export class DBTaskImpl implements Db<Task> {

  static FILE_NAME = process.env.DB_FILE_NAME || 'db/data.json';
  saveDB = (data: Map<string, Task>) => {
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
