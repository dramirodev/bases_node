import inquirer from "inquirer";
import Task from "../models/Task";

export function printTask(index: number, task: Task) {
  console.log(`${index}. ${task.description} :: ${task.completadoEn ? 'Completada'.green : 'Pendiente'.red}`);
}

export function printList(tasks: Map<string, Task>, cb: (index: number, task: Task) => void) {
  Array.from(tasks).map(([key, task], index) => cb(index, task));
}


export async function completeMenu(tasks: Map<string, Task>) {
  const choices = Array.from(tasks, ([_, value]) => (value)).map((task: Task) => {
    return {
      value: task.id,
      name: task.description,
      checked: !!task.completadoEn
    };
  });
  console.log('Completar tarea(s)');
  const {ids} = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione la tarea a completar: '.yellow,
      choices,
    }
  ]);

  return ids;
}

export async function createTaskMenu() {
  const {description} = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      validate(value: string) {
        if (value.length === 0) {
          return 'Por favor ingrese una descripción: '.red;
        }
        return true;
      },
      message: 'Descripción de la tarea: '.yellow,
    }]);
  return description;
}
