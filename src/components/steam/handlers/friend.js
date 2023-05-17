require('dotenv/config');

const log = require('../../../utils/log');
const { steam } = require('../../../dict/english');
const api = require('../utils/api');
const SteamAPI = new api(process.env.STEAMAPIKEY);

module.exports = async (steamID, rel, client) => {
    const details = await SteamAPI.getPlayerSummaries(steamID.getSteamID64());
    if(!account.acceptFriendRequests){
        log(3, 'steam_login', `Received friend request from ${details.personaname} {${steamID.getSteamID64()}}`);
        return log(3, 'steam_login', `Not accepting it, due to settings!`);
    }
    if(rel == 2 || rel == 'RequestRecipient'){
        client.addFriend(steamID);
        client.chat.sendFriendMessage(steamID, steam.friendRequestReceived(client, details.personaname, steamID));
    }
}