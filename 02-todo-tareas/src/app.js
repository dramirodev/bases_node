import {FilesController} from "./controller/FilesController.js";
import {TareasController} from "./controller/TareasController.js";
import {InquirerMenu} from "./models/InquirerMenu.js";


export const app = async () => {
  const tareasController = new TareasController();
  const inquirerMenu = new InquirerMenu(tareasController);
  const filesController = new FilesController();

  const tareas = filesController.readDB();

  if (tareas) {
    tareasController.initializeTareas(tareas);
  }


  await inquirerMenu.showMenu();

};
