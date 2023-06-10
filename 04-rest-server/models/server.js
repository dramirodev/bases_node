const express = require('express');
const cors = require('cors');
class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/user';
    this.middleware();
    this.routes();
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }
}

module.exports = Server;
