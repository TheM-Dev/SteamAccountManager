const log = require('../../../utils/log');
const idle = require('./idle');

module.exports = (client, account) => {
    client.setPersona(1);
    log(1, 'steam_login', `Online status set.`, account.login);
    if(account.idle) idle(client, account);
}