import fs from "fs";

export class FilesController {

  static FILE_NAME = './src/db/data.json';
  saveDB = (data) => {
    fs.writeFileSync(FilesController.FILE_NAME, JSON.stringify(data));
  };

  readDB = () => {
    if (!fs.existsSync(FilesController.FILE_NAME)) {
      return null;
    }
    const data = fs.readFileSync(FilesController.FILE_NAME, {encoding: 'utf-8'});
    return JSON.parse(data);
  };
}
