import MenuController from "./controller/MenuController";
import {DBTaskImpl} from "./services/DBTaskImpl";
import {TaskMenuImpl} from "./services/TaskMenuImpl";
import TasksImpl from "./services/TasksImpl";


function main() {
  const instance = TasksImpl.getInstance(new DBTaskImpl());
  const taskMenu = new TaskMenuImpl();
  const menu = new MenuController(instance, taskMenu);
  menu.showMenu();
}

export default main;
