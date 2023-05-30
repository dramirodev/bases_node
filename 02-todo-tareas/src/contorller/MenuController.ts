import 'colors';
import inquirer from 'inquirer';
import {createInterface} from "readline";
import Tarea from "../dto/Tarea";
import {Tareas} from "../interfaces/Tareas";


export default class MenuController {

  private provider: any;
  private opt: string = '';

  constructor(provider: Tareas) {
    this.provider = provider;
  }

  private async menu() {
    return inquirer.prompt([
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
  }

  async pause() {
    await inquirer.prompt([
      {
        message: `\nPresione ${'ENTER'.green} para continuar`,
        type: 'input',
        name: 'enter',
      }]);

  }

  async manageOption() {
    switch (this.opt) {
      case '1':
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
            message: 'Descripción de la tarea: '.green,
          }]);

        const newTask = new Tarea(description);
        this.provider.addTask(newTask);
        break;
      case '2':
        console.log('Listar tareas');
        this.provider.listTasks();
        break;
      case '3':
        console.log('Listar tareas completadas');
        // this.provider.listCompletedTasks();
        break;
      case '4':
        console.log('Listar tareas pendientes');
        // this.provider.listPendingTasks();
        break;
      case '5':
        console.log('Completar tarea(s)');
        // this.provider.completeTasks();
        break;
      case '6':
        console.log('Borrar tarea');
        // this.provider.deleteTask();
        break;
      default:
        break;
    }
    await this.pause();
  }

  public async showMenu() {
    do {
      const {option} = await this.menu();
      this.opt = option;
      await this.manageOption();
      // await this.pause();
    } while (this.opt !== '0');
  }


  public readInput(message: string): void {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(message, (opt: string) => {
      this.opt = opt;
      readline.close();
    });
  }
}
