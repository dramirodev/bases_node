const dotenv = require('dotenv');
const {Server} = require("./models");

dotenv.config();


const server = new Server();

server.listen();


