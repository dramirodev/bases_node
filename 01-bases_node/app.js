const {crearArchivo, crearTablaDeMultiplicar} = require('./helpers/multiplicar');
const colors = require('colors');
const argv = require('./config/yargs');


console.clear();

let salida = crearTablaDeMultiplicar(argv.b, argv.l);

crearArchivo(argv.b, salida)
    .then((fileName) => console.log(colors.green(fileName)))
    .catch((e) => console.log(colors.red(e)));


