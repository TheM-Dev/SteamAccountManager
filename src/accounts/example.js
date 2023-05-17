module.exports = {
    login: 'login', //Account login
    password: 'password', //Account password

    sharedSecret: 'sharedSecret', //Account shared secret (can be retrieved if your phone has root, or you are using SDA)
    identitySecret: 'identitySecret', //Account shared secret (can be retrieved if your phone has root, or you are using SDA)

    masterID: 'masterSteamID64', //SteamID64 of an account that will be the master of this one (can control everything by Steam chat)
    rerouteMessages: true, //Send all messages coming to the bots to master account

    acceptFriendRequests: true, //Autoaccepting friend requests
    respondToOffers: true, //Currently only accepting offers where we don't give anything
    respondToMessages: true, //Responding to messages with set texts (src/dict/yourlanguage.js)

    idle: true, //Idle hours in game
    games: [ 730 ] //Games list, you can get the IDs on https://steamdb.info
}