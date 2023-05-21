//Controls the overall of the app
//Turns on every enabled component
const expressServer = require('./components/dashboard/server');
const server = new expressServer();
const log = require('./utils/log');
const loadAccounts = require('./components/steam/utils/loadAccounts');
let accounts = [];
(async () => { accounts = await loadAccounts(); })();

server.app.post('/statuses/process/update', server.loggingMiddleware, (req, res) => {
    let { cpu, memory } = req.body;
    res.sendStatus(200)
});

server.app.get('/api/accounts', server.loggingMiddleware, (req, res) => {
    res.json(accounts);
});