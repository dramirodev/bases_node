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
            return 'Please enter a description: '.red;
          }
          return true;
        },
        message: 'Task description: '.yellow,
      }]);
    return description;
  }

  async completeMenu(tasks: Map<string, Task>): Promise<string[]> {
    const choices = Array.from(tasks.values()).map((task) => {
      return {
        value: task.id,
        name: task.description,
        checked: !!task.completedAt,
      };
    });
    const {ids} = await inquirer.prompt([
      {
        type: "checkbox",
        name: "ids",
        message: "Select tasks to be completed",
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
        message: "Delete task",
        choices,
      },
    ]);
    return id;
  }

  async menu(): Promise<void> {
    console.clear();
    const {option} = await inquirer.prompt([
      {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?'.underline.yellow,
        choices: [
          {
            value: '1',
            name: `${'1.'.green} Create task`
          },
          {
            value: '2',
            name: `${'2.'.green} List tasks`
          },
          {
            value: '3',
            name: `${'3.'.green} List completed tasks`
          },
          {
            value: '4',
            name: `${'4.'.green} List pending tasks`
          },
          {
            value: '5',
            name: `${'5.'.green} Complete task(s)`
          },
          {
            value: '6',
            name: `${'6.'.green} Delete task`
          },
          {
            value: '0',
            name: `${'0.'.green} Exit\n`
          }
        ]
      }]);

    this.option = option;
  }

  async pause(): Promise<void> {
    await inquirer.prompt([
      {
        message: `Press ${'ENTER'.green} to continue`,
        type: 'input',
        name: 'enter',
      }]);

  }

  getOption(): string {
    return this.option;
  }

}
