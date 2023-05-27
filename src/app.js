const log = require('./utils/log');
//Controls the overall of the app
//Turns on every enabled component

let CPU = 0;
let MEMORY = 0;

const expressServer = require('./components/api/server');
const server = new expressServer();
server.app.post('/statuses/process/update', server.loggingMiddleware, (req, res) => {
    CPU = req.body.cpu;
    MEMORY = req.body.memory;
    res.sendStatus(200)
});
server.app.get('/statuses/process', server.loggingMiddleware, (req, res) => {
    res.json({ CPU, MEMORY });
});
server.app.get('/api/accounts', server.loggingMiddleware, (req, res) => {
    res.json(accounts);
});

const socketServer = require('./components/sockets/socket');
const sockets = new socketServer(5556);

const accHandler = require('./components/steam/accountHandler');
const accountHandler = new accHandler();

sockets.io.on('connection', (socket) => {
    log(1, 'socket_manager', `New browser window connected! ID: ${socket.id}`);
    
    socket.on('disconnect', () => {
        log(1, 'socket_manager', `Browser window closed! ID: ${socket.id}`);
    });

});