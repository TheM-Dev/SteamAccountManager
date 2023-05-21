const log = require('./utils/log');
//Controls the overall of the app
//Turns on every enabled component
const loadAccounts = require('./components/steam/utils/loadAccounts');
let accounts = [];
(async () => { accounts = await loadAccounts(); })();

const expressServer = require('./components/api/server');
const server = new expressServer();
server.app.post('/statuses/process/update', server.loggingMiddleware, (req, res) => {
    let { cpu, memory } = req.body;
    res.sendStatus(200)
});
server.app.get('/api/accounts', server.loggingMiddleware, (req, res) => {
    res.json(accounts);
});

const socketServer = require('./components/sockets/socket');
const socket = new socketServer();