const fs = require('fs');
const colors = require('colors');

const imprimirTablaDeMultiplicar = (tabla, base) => {

  console.log(colors.underline(`Tabla del ${base}`).yellow);

  console.log(tabla);
}
const crearArchivo = async (base = 5, salida) => {
  try {
    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
    return `tabla-${base}.txt creado`;
  } catch (e) {
    throw e;
  }

};

const crearTablaDeMultiplicar = (base = 5 , imprimir = false) => {
  let tabla = '';
  for (let i = 1; i <= 10; i++) {
    tabla += `${base} x ${i} = ${base * i}\n`;
  }

  if(imprimir) {
    imprimirTablaDeMultiplicar(tabla, base);
  }

  return tabla;
};


module.exports = {
  crearArchivo,
  crearTablaDeMultiplicar
};
