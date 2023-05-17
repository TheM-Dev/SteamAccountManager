const log = require('../../../utils/log');

module.exports = (client, account) => {
    client.gamesPlayed(account.games, true);
    log(1, 'steam_login', `Idling started.`, account.login);
}