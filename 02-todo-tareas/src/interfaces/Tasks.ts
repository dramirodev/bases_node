import Task from "../models/Task";

export interface Tasks {


  add(task: Task): void;

  complete(tasks: string[]): void;

  delete(task: string): void;

  getTasks(): Map<string, Task>;

  list(): void;

  listCompleted(): void;

  listPending(): void;
}
