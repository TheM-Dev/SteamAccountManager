const log = require('../../../utils/log');
const api = require('../utils/api');
const SteamAPI = new api(process.env.STEAMAPIKEY);

module.exports = async (Offer, client, manager, community, account) => {
    let SteamID64 = Offer.partner.getSteamID64();
    const details = await SteamAPI.getPlayerSummaries(SteamID64);
    let nickname = details.personaname;

    client.chat.sendFriendMessage(
        SteamID64,
        `/me [${nickname}] Processing your tradeoffer...`
    );

    log(1, 'steam_trades', `New tradeoffer! Processing it now...`, account.login);
    if(account.tradeoffers.autoAccept.giftOffers && Offer.itemsToGive < 1){
        log(1, 'steam_trades', `Our items are empty in this offer, accepting it...`, account.login);
        log(3, 'steam_trades', `You can turn this setting off in account file!`, account.login);
        return Offer.accept((err, status) => {
            if(err) return log(2, 'steam_trades', `Unable to accept tradeoffer! ${err}`, account.login);
            log(1, 'steam_trades', `Offer accepted! Status: ${status}`, account.login);
            return client.chat.sendFriendMessage(
                SteamID64,
                `/me [${nickname}] Accepted your gift offer!`
            );
        });
    }
    if(Offer.partner.getSteamID64() === account.masterID){
        log(1, 'steam_trades', `Offer is coming from our master, auto-accepting!`, account.login);
        log(3, 'steam_trades', `You can turn this setting off in account file!`, account.login);
        return Offer.accept((err, status) => {
            if(err) return log(2, 'steam_trades', `Unable to accept tradeoffer! ${err}`, account.login);
            log(1, 'steam_trades', `Offer accepted! Status: ${status}`, account.login);
            return client.chat.sendFriendMessage(
                SteamID64,
                `/me [${nickname}] Accepted your gift offer, because your are the bot master!`
            );
        });
    }
}