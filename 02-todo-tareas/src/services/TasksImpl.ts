import {printList, printTask} from "../helpers";
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
    printList(this.tasks, (index: number, task:Task) => {
      if (task.completadoEn) {
        printTask(index, task);
      }
    });
  }

  listPending(): void {
    console.log("\nListado de tareas pendientes\n".underline.bgWhite);
    printList(this.tasks, (index: number, task:Task) => {
      if (!task.completadoEn) {
        printTask(index, task);
      }
    });
  }

  list(): void {
    printList(this.tasks, (index: number, task:Task) => {
        printTask(index, task);
    });
  }

  complete(tasks: string): void {
    this.tasks.forEach((task) => {
      if (task.id === tasks) {
        task.completadoEn = new Date();
      }
    });
  }

}
