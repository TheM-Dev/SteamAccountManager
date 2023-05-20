const log = require('../../../utils/log');

module.exports = (sessionid, cookies, client, manager, community, account) => {
    manager.setCookies(cookies);
    community.setCookies(cookies);
    log(1, 'steam_login', `Cookies successfully set!`, account.login);
    if(account.identitySecret){
        community.startConfirmationChecker(10000, account.identitySecret);
        log(1, 'steam_login', `Confirmation checker started.`, account.login);
    }
}