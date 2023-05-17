const log = require('../../utils/log');
const { errorCodes } = require('./enums');

const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const SteamID = require('steamid');

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
            machineName,
            clientOS: 16,
            dontRememberMachine: false,
            rememberPassword: true
        }
        if(account.sharedSecret) this.logOnOptions.twoFactorCode = SteamTotp.generateAuthCode(account.sharedSecret);

        this.client.logOn(this.logOnOptions);
        this.client.on('loggedOn', () => {
            this.steamID64 = this.client.steamID.getSteamID64();
            this.client.setPersona(1);
            log(1, 'steam_login', `Online status set.`, account.login);
            if(account.idle){
                this.client.gamesPlayed(account.games, true);
                log(1, 'steam_login', `Idling started.`, account.login);
            }
        });

        this.client.on('error', (err) => {
            switch(err){
                case "Error: RateLimitExceeded":
                    log(2, 'steam_login', `Couldnt log-in! Error: Rate Limit Exceeded`, account.login);
                    let rateLimitCooldown = Math.floor(Math.random() * (120 - 45 + 1)) + 45;
                    log(3, 'steam_login', `Retrying in ${rateLimitCooldown} seconds!`, account.login);
                    setTimeout(() => { this.client.relog(); }, rateLimitCooldown * 1000);
                    break;
                case "Error: LoggedInElsewhere":
                    log(2, 'steam_login', `Couldnt log-in! Error: Logged In Elsewhere!`, account.login);
                    let LoggedInElsewhereCooldown = Math.floor(Math.random() * (360 - 120 + 1)) + 120;
                    log(3, 'steam_login', `Retrying in ${LoggedInElsewhereCooldown} seconds!`, account.login);
                    setTimeout(() => { this.client.relog(); }, LoggedInElsewhereCooldown * 1000);
                    break;
                case "Already logged on, cannot log on again":
                    log(2, 'steam_login', `Couldnt log-in! Error: We are already logged in!`, account.login);
                    break;
                case "Error: InvalidPassword":
                    log(2, 'steam_login', `Couldnt log-in! Error: Invalid password!`, account.login);
                    break;
                default:
                    log(2, 'steam_login', `Couldnt log-in! Error: ${errorCodes[err.eresult]}`, account.login);
            }
        });

    }

}