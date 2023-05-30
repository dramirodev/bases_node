import MenuController from "./contorller/MenuController";
import TareasProvider from "./providers/TareasProvider";

const taskProvider = new TareasProvider();

function main() {
  const menu = new MenuController(taskProvider);
  menu.showMenu();
}

export default main;
