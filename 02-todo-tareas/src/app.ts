import MenuController from "./controller/MenuController";
import {DBTareasImpl} from "./services/DBTareasImpl";
import TareasImpl from "./services/TareasImpl";

const instance =TareasImpl.getInstance(new DBTareasImpl());

function main() {
  const menu = new MenuController(instance);
  menu.showMenu();
}

export default main;
