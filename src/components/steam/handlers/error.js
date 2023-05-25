const log = require('../../../utils/log');
const { errorCodes } = require('../utils/enums');
const SteamTotp = require('steam-totp');

module.exports = (err, client, logOnOptions, account) => {
    switch(err){
        case "Error: RateLimitExceeded":
            log(2, 'steam_login', `Couldnt log-in! Error: Rate Limit Exceeded`, account.login);
            let rateLimitCooldown = Math.floor(Math.random() * (120 - 45 + 1)) + 45;
            log(3, 'steam_login', `Retrying in ${rateLimitCooldown} seconds!`, account.login);
            setTimeout(() => {
                if(account.sharedSecret) logOnOptions.twoFactorCode = SteamTotp.generateAuthCode(account.sharedSecret);
                client.logOn(logOnOptions);
            }, rateLimitCooldown * 1000);
            break;
        case "Error: LoggedInElsewhere":
            log(2, 'steam_login', `Couldnt log-in! Error: Logged In Elsewhere!`, account.login);
            let LoggedInElsewhereCooldown = Math.floor(Math.random() * (360 - 120 + 1)) + 120;
            log(3, 'steam_login', `Retrying in ${LoggedInElsewhereCooldown} seconds!`, account.login);
            setTimeout(() => {
                if(account.sharedSecret) logOnOptions.twoFactorCode = SteamTotp.generateAuthCode(account.sharedSecret);
                client.logOn(logOnOptions);
            }, LoggedInElsewhereCooldown * 1000);
            break;
        case "Already logged on, cannot log on again":
            log(2, 'steam_login', `Couldnt log-in! Error: We are already logged in!`, account.login);
            break;
        case "Error: InvalidPassword":
            log(2, 'steam_login', `Couldnt log-in! Error: Invalid password!`, account.login);
            break;
        default:
            log(2, 'steam_login', `Couldnt log-in! Error: ${errorCodes[err.eresult]}`, account.login);
            let otherErrorsCooldown = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
            log(3, 'steam_login', `Retrying in ${otherErrorsCooldown} seconds!`, account.login);
            setTimeout(() => {
                if(account.sharedSecret) logOnOptions.twoFactorCode = SteamTotp.generateAuthCode(account.sharedSecret);
                client.logOn(logOnOptions);
            }, otherErrorsCooldown * 1000);
    }
}