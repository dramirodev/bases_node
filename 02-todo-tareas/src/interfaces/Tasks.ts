import Task from "../models/Task";

export interface Tasks {
  list(): void;

  add(task: Task): void;

  listCompleted(): void;

  listPending(): void;

  complete(tasks: string): void;

  delete(task: string): void;
}
