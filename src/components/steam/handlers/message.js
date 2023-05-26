require('dotenv/config');

const { steam } = require('../../../dict/english');
const api = require('../utils/api');
const SteamAPI = new api(process.env.STEAMAPIKEY);

module.exports = async (message, client, masterID) => {
    const details = await SteamAPI.getPlayerSummaries(message.steamid_friend.getSteamID64());
    if(message.message.includes('lobbyinvite')) return steam.gameInviteReceived(client, details.personaname, message);
    if(message.message.includes('tradeoffer')) return;
    if(masterID == message.steamid_friend.getSteamID64()) return;
    return steam.friendMessageReceived(client, details.personaname, message);
}