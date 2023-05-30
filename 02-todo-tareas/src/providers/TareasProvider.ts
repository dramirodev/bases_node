import Tarea from "../dto/Tarea";
import {Tareas} from "../interfaces/Tareas";

export default class TareasProvider implements Tareas {

  private tasks: Map<string, Tarea> = new Map();

  addTask(task: Tarea): void {
    this.tasks.set(task.id, task);
  }

  deleteTask(task: string): void {
    this.tasks.delete(task);
  }

  listCompletedTasks(): void {
    this.tasks.forEach((task) => {
      if (task.completadoEn) {
        console.log(task.description);
      }
    })
  }

  listPendingTasks(): void {
    this.tasks.forEach((task) => {
      if (!task.completadoEn) {
        console.log(task.description);
      }
    })
  }

  listTasks(): void {
    console.log('Listar tareas');
    this.tasks.forEach((task) => {
      console.log(task.description);
    });
  }

  completeTask(tasks: string): void {
    this.tasks.forEach((task) => {
      if (task.id === tasks) {
        task.completadoEn = new Date();
      }
    })
  }

}
