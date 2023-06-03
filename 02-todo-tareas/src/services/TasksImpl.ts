import Task from "../models/Task";
import {Db} from "../interfaces/Db";
import {Tasks} from "../interfaces/Tasks";

export default class TasksImpl implements Tasks {
  static _instance: TasksImpl | null = null;
  private tasks: Map<string, Task>;
  private db: Db<Task>;

  constructor(db: Db<Task>) {
    this.db = db;
    this.tasks = this.db.readDB() || new Map();
  }

  static getInstance(db: Db<Task>) {
    return this._instance || (this._instance = new this(db));
  }

  add(task: Task): void {
    this.tasks.set(task.id, task);
    this.db.saveDB(this.tasks);
  }

  delete(task: string): void {
    this.tasks.delete(task);
    this.db.saveDB(this.tasks);
  }

  listCompleted(): void {
    console.log("\nListado de tareas completadas\n".underline.bgWhite);
    let index = 0;
    for(const [key, task] of this.tasks) {
      if (task.completadoEn) {
        console.log(`${index + 1}.`.green);
        task.print();
      }
      index++;
    }
  }

  listPending(): void {
    console.log("\nListado de tareas pendientes\n".underline.bgWhite);
    let index = 0;
    for(const [key, task] of this.tasks) {
      if (!task.completadoEn) {
        console.log(`${index + 1}.`.green);
        task.print();
      }
      index++;
    }
  }

  list(): void {
    let index = 0;
    console.log("\nListado de tareas".underline);
    for(const [key, task] of this.tasks) {
      console.log(`${index + 1}.`.green);
      task.print();
      index++;
    }
  }

  complete(tasks: string): void {
    this.tasks.forEach((task) => {
      if (task.id === tasks) {
        task.completadoEn = new Date();
      }
    });
  }

}
