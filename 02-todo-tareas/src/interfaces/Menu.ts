import Task from "../models/Task";

export interface Menu {


  completeMenu(tasks: Map<string, Task>): Promise<string[]>;

  createTaskMenu(): Promise<string>;

  deleteMenu(tasks: Map<string, Task>): Promise<string>;

  getOption(): string;

  menu(): Promise<void>;

  pause(): Promise<void>;
}
