import 'colors';
import inquirer from 'inquirer';
import {completeMenu, createTaskMenu} from "../helpers";
import {Tasks} from "../interfaces/Tasks";
import Task from "../models/Task";


export default class MenuController {

  private service: Tasks;
  private opt: string = '';

  constructor(provider: Tasks) {
    this.service = provider;
  }

  private async menu() {
    console.clear();
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
        message: `Presione ${'ENTER'.green} para continuar`,
        type: 'input',
        name: 'enter',
      }]);

  }

  async manageOption() {
    switch (this.opt) {
      case '1':
        const description = await createTaskMenu();
        const newTask = new Task(description);
        this.service.add(newTask);
        console.log('Tarea creada correctamente \n'.green);
        break;
      case '2':
        this.service.list();
        break;
      case '3':
        this.service.listCompleted();
        break;
      case '4':
        this.service.listPending();
        break;
      case '5':
        const ids = await completeMenu(this.service.getTasks());
        this.service.complete(ids);
        break;
      case '6':
        console.log('Borrar tarea');
        // this.service.delete();
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


  // public readInput(message: string): void {
  //   const readline = createInterface({
  //     input: process.stdin,
  //     output: process.stdout
  //   });
  //
  //   readline.question(message, (opt: string) => {
  //     this.opt = opt;
  //     readline.close();
  //   });
  // }
}
