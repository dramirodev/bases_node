const express = require('express');
const cors = require('cors');
const {connectDB} = require("../database/config");
const fileUpload = require('express-fileupload');


class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      users: '/api/user',
      auth: '/api/auth',
      categories: '/api/categories',
      files: '/api/uploads'
    };
    this.dbConnection();
    this.middleware();
    this.routes();
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.users, require('../routes/user'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.files, require('../routes/uploads'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }

  async dbConnection() {
    await connectDB();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }
}

module.exports = Server;
