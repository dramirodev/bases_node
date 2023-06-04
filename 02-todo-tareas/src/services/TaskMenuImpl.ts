import inquirer from "inquirer";
import {Menu} from "../interfaces/Menu";
import Task from "../models/Task";

export class TaskMenuImpl implements Menu {
  private option: string = '';

  async createTaskMenu(): Promise<string> {
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

  async completeMenu(tasks: Map<string, Task>): Promise<string[]> {
    const choices = Array.from(tasks.values()).map((task) => {
      return {
        value: task.id,
        name: task.description,
        checked: !!task.completadoEn,
      };
    });
    const {ids} = await inquirer.prompt([
      {
        type: "checkbox",
        name: "ids",
        message: "Seleccione",
        choices,
      },
    ]);
    return ids;
  }

  async deleteMenu(tasks: Map<string, Task>): Promise<string> {
    const choices = Array.from(tasks.values()).map((task) => {
      return {
        value: task.id,
        name: task.description,
      };
    });
    const {id} = await inquirer.prompt([
      {
        type: "list",
        name: "id",
        message: "Borrar",
        choices,
      },
    ]);
    return id;
  }

  async menu() {
    console.clear();
    const {option} = await inquirer.prompt([
      {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?'.underline.yellow,
        choices: [
          {
            value: '1',
            name: `${'1.'.green} Crear tarea`
          },
          {
            value: '2',
            name: `${'2.'.green} Listar tareas`
          },
          {
            value: '3',
            name: `${'3.'.green} Listar tareas completadas`
          },
          {
            value: '4',
            name: `${'4.'.green} Listar tareas pendientes`
          },
          {
            value: '5',
            name: `${'5.'.green} Completar tarea(s)`
          },
          {
            value: '6',
            name: `${'6.'.green} Borrar tarea`
          },
          {
            value: '0',
            name: `${'0.'.green} Salir\n`
          }
        ]
      }]);

    this.option = option;
  }

  async pause() {
    await inquirer.prompt([
      {
        message: `Presione ${'ENTER'.green} para continuar`,
        type: 'input',
        name: 'enter',
      }]);

  }

  getOption(): string {
    return this.option;
  }

}
