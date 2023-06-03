import MenuController from "./controller/MenuController";
import {DBTaskImpl} from "./services/DBTaskImpl";
import TasksImpl from "./services/TasksImpl";

const instance =TasksImpl.getInstance(new DBTaskImpl());

function main() {
  const menu = new MenuController(instance);
  menu.showMenu();
}

export default main;
