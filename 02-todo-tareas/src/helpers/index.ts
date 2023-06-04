import Task from "../models/Task";

export function printTask(index: number, task: Task) {
  console.log(`${index}. ${task.description} :: ${task.completadoEn ? 'Completada'.green : 'Pendiente'.red}`);
}

export function printList(tasks: Map<string, Task>, cb: (index: number, task: Task) => void) {
  Array.from(tasks).map(([key, task], index) => cb(index, task));
}
