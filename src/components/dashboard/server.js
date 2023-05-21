const express = require('express');
const log = require('../../utils/log');
const path = require('path');
const bodyParser = require('body-parser');

module.exports = class webServer {
    constructor(){
        this.app = express();
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '/views'));
        this.app.use(bodyParser.json());

        this.loggingMiddleware = (req, res, next) => { log(0, 'web_server', `New request on ${req.url}`); next() };

        this.app.get('/', this.loggingMiddleware, (req, res) => res.render('home'));
        this.app.get('/dashboard', this.loggingMiddleware, (req, res) => res.render('dashboard'));
        this.app.get('/accounts', this.loggingMiddleware, (req, res) => res.render('accounts'));
        this.app.get('/games', this.loggingMiddleware, (req, res) => res.render('games'));

        this.app.listen(5555, () => log(1, 'web_server', `Web dashboard running on http://localhost:5555/`));
    }
}