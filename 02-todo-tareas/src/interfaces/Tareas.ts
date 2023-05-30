import Tarea from "../dto/Tarea";

export interface Tareas {
  listTasks(): void;
  addTask(task: Tarea): void;
  listCompletedTasks(): void;
  listPendingTasks(): void;
  completeTask(tasks: string): void;
  deleteTask(task: string): void;
}
