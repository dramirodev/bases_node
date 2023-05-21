import colors from 'colors';
import inquirer from 'inquirer';

export class InquirerMenu {
  _option = '';
  _questions = [
    {
      type: 'list',
      name: 'option',
      message: '¿Qué te gustaría hacer?',
      choices: [
        {
          value: '1',
          name: `${colors.green('1.')} Crear tarea`
        }, {
          value: '2',
          name: `${colors.green('2.')} Listar tareas`
        }, {
          value: '3',
          name: `${colors.green('3.')} Listar tareas completadas`
        }, {
          value: '4',
          name: `${colors.green('4.')} Listar tareas pendientes`
        }, {
          value: '5',
          name: `${colors.green('5.')} Completar tarea(s)`
        }, {
          value: '6',
          name: `${colors.green('6.')} Borrar tarea`
        }, {
          value: '0',
          name: `${colors.green('0.')} Salir`
        },
      ],

    }
  ];

  constructor(controller) {
    this.controller = controller;
  }

  menu = async () => {
    const {option} = await inquirer.prompt(this._questions);
    this._option = option;
  }

  showMenu = async () => {
    console.log(colors.underline('Lista de TODO"s \n').yellow);
    do {
      if (this._option !== '0') {
        await this.menu();
        await this.manageUserAnswer();
        await this.pause();
      }
    } while (this._option !== '0');

  };

  userInput = async (message) => {
    const question = [
      {
        type: 'input',
        name: 'description',
        message,
        validate(value) {
          if (value.length === 0) {
            return 'Por favor ingrese un valor';
          }
          return true;
        }
      }
    ];
    const {description} = await inquirer.prompt(question);
    return description;
  };

  pause = async () => {
    const question = [
      {
        type: 'input',
        name: 'enter',
        message: `Presione ${colors.green('ENTER')} para continuar`
      }
    ];
    console.log('\n');
    await inquirer.prompt(question);
  };

  manageUserAnswer = async () => {

    switch (this._option) {
      case '1':
        // Crear tarea
        const desc = await this.userInput('Descripción: ');
        this.controller.addTarea(desc);
        break;
      case '2':
        // Listar _tareas
        console.log(this.controller.listTareas());
        break;
      case '3':
        // Listar _tareas completadas
        break;
      case '4':
        // Listar _tareas pendientes
        break;
      case '5':
        // Completar tarea(s)
        break;
      case '6':
        // Borrar tarea
        break;
      default:
        break;
    }
  };
}


