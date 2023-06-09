import {printList, printTask} from "../helpers";
import {Database} from "../interfaces/Database";
import {Tasks} from "../interfaces/Tasks";
import Task from "../models/Task";

export default class TasksImpl implements Tasks {

  static instance: TasksImpl | null = null;
  private readonly _tasks: Map<string, Task>;
  private readonly db: Database<Task>;

  constructor(db: Database<Task>) {
    this.db = db;
    this._tasks = this.db.readDB() || new Map();
  }

  static getInstance(db: Database<Task>): TasksImpl {
    return this.instance || (this.instance = new this(db));
  }

  add(task: Task): void {
    this._tasks.set(task.id, task);
    this.db.saveDB(this._tasks);
  }

  delete(task: string): void {
    this._tasks.delete(task);
    this.db.saveDB(this._tasks);
  }

  listCompleted(): void {
    printList(this._tasks, (index: number, task: Task) => {
      if (task.completedAt) {
        printTask(index, task);
      }
    });
  }

  listPending(): void {
    printList(this._tasks, (index: number, task: Task) => {
      if (!task.completedAt) {
        printTask(index, task);
      }
    });
  }

  list(): void {
    printList(this._tasks, (index: number, task: Task) => {
      printTask(index, task);
    });
  }

  complete(tasks: string[]): void {
    this._tasks.forEach((task) => {
      if (tasks.includes(task.id)) {
        task.completedAt = new Date();
      }else {
        task.completedAt = null;
      }
    });
    this.db.saveDB(this._tasks);
  }

  getTasks(): Map<string, Task> {
    return this._tasks;
  }

}
