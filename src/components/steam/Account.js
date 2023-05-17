require('dotenv/config');

const log = require('../../utils/log');
const config = require('../../config');

const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const SteamID = require('steamid');
const message = require('./handlers/message');
const login = require('./handlers/login');
const error = require('./handlers/error');

module.exports = class Account {
    constructor(account){

        if(!account.login) return log(3, 'steam_login', 'No login provided in account file!');
        if(!account.password) return log(3, 'steam_login', `No password provided in account file!`, account.login);
        if(!account.sharedSecret) log(2, 'steam_login', `No shared secret provided in account file!`, account.login);
        if(!account.identitySecret) log(2, 'steam_login', `No identity secret provided in account file!`, account.login);

        this.client = new SteamUser();
        this.community = new SteamCommunity();
        this.manager = new TradeOfferManager({
            steam: this.user,
            community: this.community,
            language: 'en'
        });
        
        this.logOnOptions = {
            accountName: account.login,
            password: account.password,
            rememberPassword: true,
            machineName: config.steam.machineName,
            clientOS: 16,
            dontRememberMachine: false,
            rememberPassword: true
        }
        if(account.sharedSecret) this.logOnOptions.twoFactorCode = SteamTotp.generateAuthCode(account.sharedSecret);

        this.client.logOn(this.logOnOptions);

        this.client.on('loggedOn', () => login(this.client, account));
        this.client.on('error', (err) => error(err, this.client, this.logOnOptions));
        this.client.chat.on('friendMessage', (msg) => message(msg, this.client));

    }

}