const express = require('express');
const log = require('../../utils/log');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = class webServer {
    constructor(){
        this.app = express();
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '/views'));
        this.app.use(bodyParser.json());
        this.app.use(cors());

        this.loggingMiddleware = (req, res, next) => { log(0, 'web_server', `New request on ${req.url}`); next() };

        this.app.listen(5555, () => log(1, 'web_server', `API running on *:5555`));
    }
}