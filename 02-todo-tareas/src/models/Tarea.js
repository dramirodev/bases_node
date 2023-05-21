import { v4 as uuidv4 } from 'uuid';

export class Tarea {
  constructor(descripcion) {
    this.id = uuidv4()
    this.desc = descripcion;
    this.completadoEn = null;
  }

  imprimirTarea() {
    console.log(`${this.id} :: ${this.desc} :: ${this.completadoEn}`);
  }

  completarTarea() {
    this.completadoEn = new Date();
  }
}
