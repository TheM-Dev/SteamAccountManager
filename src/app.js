const log = require('./utils/log');
//Controls the overall of the app
//Turns on every enabled component
const loadAccounts = require('./components/steam/utils/loadAccounts');
const Account = require('./components/steam/Account');
let accountsFiles = []; let accountsIDs = [];
(async () => {
    accountsFiles = await loadAccounts();
    accountsFiles.forEach(async (af) => {
        let acc = new Account(af);
        setTimeout(() => accountsIDs.push({
            login: acc.account.login,
            ID: acc.steamID64
        }), 5000);
    });
})();

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
const sockets = new socketServer();

sockets.io.on('connection', (socket) => {
    log(1, 'socket_manager', `New browser window connected! ID: ${socket.id}`);
    
    socket.on('disconnect', () => {
        log(1, 'socket_manager', `Browser window closed! ID: ${socket.id}`);
    });

    socket.on('request_accounts', (data) => {
        log(1, 'socket_manager', `Account list requested by /${data}`);
        socket.emit('accounts_update', accountsIDs);
    });

});