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
const websession = require('./handlers/websession');
const handleOffer = require('./handlers/tradeoffers');

module.exports = class Account {
    constructor(account){

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
        this.client.on('error', (err) => error(err, this.client, this.logOnOptions, account));
        this.client.chat.on('friendMessage', (msg) => message(msg, this.client));
        this.client.on('friendRelationship', (steamID, rel) => friend(steamID, rel, client));
        this.client.on('webSession', (sessionid, cookies) => websession(sessionid, cookies, this.client, this.manager, this.community, account));
        this.manager.on('newOffer', (Offer) => handleOffer(Offer, this.client, this.manager, this.community, account))

    }

}