import {Tarea} from "../models/Tarea.js";
import {Tareas} from "../models/Tareas.js";
import {DBTareasImpl} from "../services/DBTareasImpl.ts";

export class TareasController {
  _tareas = null;
  _fs = new DBTareasImpl();

  constructor() {
    this._tareas = Tareas.instance;
  }

  initializeTareas = (tareas) => {
    if (tareas !== null) {
      this._tareas.addTareas(tareas);
    }
  };

  addTarea = (description) => {
    const tarea = new Tarea(description);
    this._tareas.addTarea(tarea);
    this._fs.saveDB(this._tareas.listadoArr);
  };

  listTareas = () => {
    return this._fs.readDB();
  };
}
