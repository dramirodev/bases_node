import Task from "../models/Task";

export interface Menu {
  menu(): Promise<void>;

  createTaskMenu(): Promise<string>;

  completeMenu(tasks: Map<string, Task>): Promise<string[]>;

  deleteMenu(tasks: Map<string, Task>): Promise<string>;

  getOption(): string;

  pause(): Promise<void>;
}
