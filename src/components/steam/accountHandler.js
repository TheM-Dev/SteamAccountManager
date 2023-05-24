const loadAccounts = require('../../components/steam/utils/loadAccounts');
const Account = require('../../components/steam/Account');
const socketServer = require('../sockets/socket');

let accountsFiles = []; let accounts = [];

module.exports = class accHandler {
    constructor(){
        this.loadAccounts = async () => {
            accountsFiles = await loadAccounts();
            accountsFiles.forEach(async (af) => {
                let acc = new Account(af);
                accounts.push(acc);
            });
        }

        this.sio = new socketServer(5557);
        this.loadAccounts();

        this.sio.app.get('/get/accounts', this.sio.loggingMiddleware, (req, res) => {
            let toDisplay = [];
            accounts.forEach(acc => {
                toDisplay.push({
                    login: acc.logOnOptions.accountName,
                    password: acc.logOnOptions.password,
                    steamID64: acc.steamID64,
                    profileDetails: acc.profileDetails
                });
            });
            res.json(toDisplay);
        });
    }
}
