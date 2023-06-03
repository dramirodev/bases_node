import fs from "fs";
import Tarea from "../dto/Tarea";
import {Db} from "../interfaces/Db";

export class DBTareasImpl implements Db<Tarea> {

  static FILE_NAME = './src/db/data.json';
  saveDB = (data: Map<string, Tarea>) => {
    fs.writeFileSync(DBTareasImpl.FILE_NAME, JSON.stringify(Object.fromEntries(data)));
  };

  readDB = (): null | Map<string, Tarea> => {
    if (!fs.existsSync(DBTareasImpl.FILE_NAME)) {
      return null;
    }
    const data = fs.readFileSync(DBTareasImpl.FILE_NAME, {encoding: 'utf-8'});
    return new Map(Object.entries(JSON.parse(data)));
  };
}
