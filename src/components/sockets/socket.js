const http = require('http');
const path = require('path');
const express = require('express');
const { Server } = require("socket.io");
const log = require('../../utils/log');
const bodyParser = require('body-parser');

module.exports = class SocketServer {
    constructor(PORT){
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server);
        this.app.use(bodyParser.json());

        this.loggingMiddleware = (req, res, next) => { log(0, 'web_server', `New request on ${req.url}`); next() };

        this.app.get('/', this.loggingMiddleware, (req, res) => {
            res.sendFile(path.join(__dirname, '../dashboard/home.html'));
        });

        this.app.get('/dashboard', this.loggingMiddleware, (req, res) => {
            res.sendFile(path.join(__dirname, '../dashboard/dashboard.html'));
        });

        this.app.get('/accounts', this.loggingMiddleware, (req, res) => {
            res.sendFile(path.join(__dirname, '../dashboard/accounts.html'));
        });

        this.app.get('/games', this.loggingMiddleware, (req, res) => {
            res.sendFile(path.join(__dirname, '../dashboard/games.html'));
        });

        this.server.listen(PORT, () => { log(1, 'socket_manager', `Dashboard running on http://localhost:${PORT}`) });
    }
}