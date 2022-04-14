const express = require('express');
const cors = require('cors');
require('dotenv').config()

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.streaming = '/api/streaming';
        this.channel = '/api/channel'
        this.search = '/api/search'
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    routes(){
        this.app.use(this.streaming, require('../routers/streaming'));
        this.app.use(this.channel, require('../routers/channel'))
        this.app.use(this.search, require('../routers/search'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Listen to port localhost: ${this.port}`)
        });
    }
}

module.exports = Server