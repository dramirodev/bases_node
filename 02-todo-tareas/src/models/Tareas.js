export class Tareas {

  static _instance = null;
  _listado = {};

  static get instance() {
    return this._instance || (this._instance = new this());
  }

  addTarea(tarea) {
    this._listado[tarea.id] = tarea;
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  addTareas = (tareas) => {
    this._listado = tareas;
  };
}
