module.exports = {
    steam: {
        gameInviteReceived: (client, nickname, message) => {
            client.chat.sendFriendMessage(
                message.steamid_friend,
                `/me Hey ${nickname}! Please, do not invite me to the game!`
            );
            return client.chat.sendFriendMessage(
                message.steamid_friend,
                `/me I'm using SteamAccountManager, idling games hours AND/OR collectible Steam cards!`
            )
        },
        friendMessageReceived: (client, nickname, message) => {
            client.chat.sendFriendMessage(
                message.steamid_friend,
                `Hello ${nickname}! Thanks for the message :steamhappy:`
            );
            return client.chat.sendFriendMessage(
                message.steamid_friend,
                `Unfortunately, I cannot respond to your message, because I'm currently using SteamAccountManager, idling hours AND/OR collectible Steam cards!`
            );
        },
        friendRequestReceived: (client, nickname, steamID) => {
            client.chat.sendFriendMessage(
                steamID,
                `Hello ${nickname}, Thanks for adding me! :steamhappy:`
            );
            return client.chat.sendFriendMessage(
                steamID,
                `Unfortunately, I cannot respond to your message, because I'm currently using SteamAccountManager, idling hours AND/OR collectible Steam cards!`
            );
        }
    }
}