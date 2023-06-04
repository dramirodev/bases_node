import 'colors';
import {Menu} from "../interfaces/Menu";
import {Tasks} from "../interfaces/Tasks";
import Task from "../models/Task";

export default class MenuController {

  private readonly tasks: Tasks;
  private readonly menu: Menu;

  constructor(service: Tasks, menu: Menu) {
    this.tasks = service;
    this.menu = menu;
  }

  async manageOption() {
    switch (this.menu.getOption()) {
      case '1':
        const description = await this.menu.createTaskMenu();
        const newTask = new Task(description);
        this.tasks.add(newTask);
        console.log('Tarea creada correctamente \n'.green);
        break;
      case '2':
        this.tasks.list();
        break;
      case '3':
        this.tasks.listCompleted();
        break;
      case '4':
        this.tasks.listPending();
        break;
      case '5':
        const ids = await this.menu.completeMenu(this.tasks.getTasks());
        this.tasks.complete(ids);
        break;
      case '6':
        const id = await this.menu.deleteMenu(this.tasks.getTasks());
        this.tasks.delete(id);
        break;
      default:
        break;
    }
    await this.menu.pause();
  }

  public async showMenu() {
    do {
      await this.menu.menu();
      await this.manageOption();
    } while (this.menu.getOption() !== '0');
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
