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

   toString(): string {
    return (`${this.description} :: ${this.completadoEn ? 'Completada' : 'Pendiente'}`);
  }
}
