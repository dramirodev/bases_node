import {v4 as uuidv4} from "uuid";

export default class Task {
  public id: string;
  public description: string;
  public completadoEn: Date | null;

  constructor(description: string, completeAt: Date | null = null) {
    this.id = uuidv4();
    this.description = description;
    this.completadoEn = completeAt;
  }

   print() {
    console.log(`${this.description} :: ${this.completadoEn ? 'Completada'.green : 'Pendiente'.red}`);
  }
}