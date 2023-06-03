import Tarea from "../dto/Tarea";
import {Db} from "../interfaces/Db";
import {Tareas} from "../interfaces/Tareas";

export default class TareasImpl implements Tareas {
  static _instance: TareasImpl | null = null;
  private tasks: Map<string, Tarea>;
  private db: Db<Tarea>;

  constructor(db: Db<Tarea>) {
    this.db = db;
    this.tasks = this.db.readDB() || new Map();
  }

  static getInstance(db: Db<Tarea>) {
    return this._instance || (this._instance = new this(db));
  }

  addTask(task: Tarea): void {
    this.tasks.set(task.id, task);
    this.db.saveDB(this.tasks);
  }

  deleteTask(task: string): void {
    this.tasks.delete(task);
    this.db.saveDB(this.tasks);
  }

  listCompletedTasks(): void {
    console.log("\nListado de tareas completadas\n".underline.bgWhite);
    let index = 0;
    for(const [key, task] of this.tasks) {
      if (task.completadoEn) {
        console.log(`${index + 1}. ${task.description} :: ${task.completadoEn ? 'Completada'.green : 'Pendiente'.red}`);
      }
      index++;
    }
  }

  listPendingTasks(): void {
    console.log("\nListado de tareas pendientes\n".underline.bgWhite);
    let index = 0;
    for(const [key, task] of this.tasks) {
      if (!task.completadoEn) {
        console.log(`${index + 1}. ${task.description} :: ${task.completadoEn ? 'Completada'.green : 'Pendiente'.red}`);
      }
      index++;
    }
  }

  listTasks(): void {
    let index = 0;
    console.log("\nListado de tareas".underline);
    for(const [key, value] of this.tasks) {
      console.log(`${index + 1}. ${value.description} :: ${value.completadoEn ? 'Completada'.green : 'Pendiente'.red}`);
      index++;
    }
  }

  completeTask(tasks: string): void {
    this.tasks.forEach((task) => {
      if (task.id === tasks) {
        task.completadoEn = new Date();
      }
    });
  }

}
