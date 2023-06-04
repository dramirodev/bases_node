import {v4 as uuidv4} from "uuid";

export default class Task {
  public id: string;
  public description: string;
  public completedAt: Date | null;

  constructor(description: string, completeAt: Date | null = null) {
    this.id = uuidv4();
    this.description = description;
    this.completedAt = completeAt;
  }

   toString(): string {
    return (`${this.description} :: ${this.completedAt ? 'Completada' : 'Pendiente'}`);
  }
}
