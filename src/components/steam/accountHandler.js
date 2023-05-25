const loadAccounts = require('../../components/steam/utils/loadAccounts');
const Account = require('../../components/steam/Account');
const socketServer = require('../sockets/socket');

module.exports = class accHandler {
    constructor(){

        this.accountsFiles = [];
        this.accounts = [];
        this.accountsDisplay = [];

        this.loadAccounts = async () => {
            this.accountsFiles = await loadAccounts();
            this.accountsFiles.forEach(async (af) => {
                let acc = new Account(af);
                this.accounts.push(acc);
            });
            this.accountsDisplay = [];
            this.accounts.forEach(acc => {
                this.accountsDisplay.push({
                    login: acc.logOnOptions.accountName,
                    password: acc.logOnOptions.password,
                    steamID64: acc.steamID64,
                    profileDetails: acc.profileDetails
                });
            });
        }

        setInterval(() => {
            this.accountsDisplay = [];
            this.accounts.forEach(acc => {
                this.accountsDisplay.push({
                    login: acc.logOnOptions.accountName,
                    password: acc.logOnOptions.password,
                    steamID64: acc.steamID64,
                    profileDetails: acc.profileDetails
                });
            });
        }, 30000);

        this.sio = new socketServer(5557);
        this.loadAccounts();

        this.sio.app.get('/get/accounts', this.sio.loggingMiddleware, (req, res) => {
            res.json(this.accountsDisplay);
        });
    }
}
