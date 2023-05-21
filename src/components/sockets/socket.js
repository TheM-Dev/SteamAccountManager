const http = require('http');
const path = require('path');
const express = require('express');
const { Server } = require("socket.io");
const log = require('../../utils/log');
const bodyParser = require('body-parser');

module.exports = class SocketServer {
    constructor(){
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

        this.io.on('connection', (socket) => {
            log(1, 'socket_manager', `New browser window connected! ID: ${socket.id}`);
            socket.on('disconnect', () => {
                log(1, 'socket_manager', `Browser window closed! ID: ${socket.id}`);
            });
        });

        this.server.listen(5556, () => { log(1, 'socket_manager', `Socket listening on *:5556`) });
    }
}