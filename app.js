const Server = require("./model/server");
require('dotenv').config();

const app = new Server();
app.listen();
