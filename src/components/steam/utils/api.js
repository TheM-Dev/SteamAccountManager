const axios = require('axios');
const urls = {
    getPlayerCount: (apiKey, appID) => {
        return `http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?key=${apiKey}&appid=${appID}`;
    },
    getPlayerSummaries: (apiKey, steamID) => {
        return `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamID}`;
    },
    getUserGroups: (apiKey, steamID) => {
        return `https://api.steampowered.com/ISteamUser/GetUserGroupList/v1/?key=${apiKey}&steamid=${steamID}`;
    },
    resolveVanityUrl: (apiKey, vanityURL) => {
        return `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${vanityURL}`;
    },
    getUserBans: (apiKey, steamID) => {
        return `https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${apiKey}&steamids=${steamID}`;
    },
    getGameAchievements: (apiKey, appID) => {
        return `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appID}`;
    },
    getUserStatsForGame: (apiKey, steamID, appID) => {
        return `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${apiKey}&steamid=${steamID}&appid=${appID}`;
    },
    getSteamGames: (apiKey) => {
        return `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${apiKey}&include_games=true&include_dlc=false&include_software=false&include_videos=false&include_hardware=false&max_results=50000`;
    },
    getSteamSoftware: (apiKey) => {
        return `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${apiKey}&include_games=false&include_dlc=false&include_software=true&include_videos=false&include_hardware=false&max_results=50000`;
    },
    getUserBadges: (apiKey, steamID) => {
        return `https://api.steampowered.com/IPlayerService/GetBadges/v1/?key=${apiKey}&steamid=${steamID}`;
    },
    getUserCommunityBadgeProgress: (apiKey, steamID) => {
        return `https://api.steampowered.com/IPlayerService/GetCommunityBadgeProgress/v1/?key=${apiKey}&steamid=${steamID}`;
    },
    getUserDisplayedBadge: (apiKey, steamID) => {
        return `https://api.steampowered.com/IPlayerService/GetFavoriteBadge/v1/?key=${apiKey}&steamid=${steamID}`;
    },
    getUserGames: (apiKey, steamID) => {
        return `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamID}`;
    },
    getUserCustomizationDetails: (apiKey, steamID) => {
        return `https://api.steampowered.com/IPlayerService/GetProfileCustomization/v1/?key=${apiKey}&steamid=${steamID}`;
    },
    getUserProfileItemsEquipped: (apiKey, steamID) => {
        return `https://api.steampowered.com/IPlayerService/GetProfileItemsEquipped/v1/?key=${apiKey}&steamid=${steamID}`;
    },
    getUserRecentlyPlayedGames: (apiKey, steamID) => {
        return `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${apiKey}&steamid=${steamID}`;
    },
    getUserLevel: (apiKey, steamID) => {
        return `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${apiKey}&steamid=${steamID}`;
    },
    getLevelDistribution: (apiKey, playerLevel) => {
        return `https://api.steampowered.com/IPlayerService/GetSteamLevelDistribution/v1/?key=${apiKey}&player_level=${playerLevel}`;
    },
    getAppNews: (apiKey, appID) => {
        return `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=${apiKey}&appid=${appID}`;
    },
    getInventory: (appID, steamID) => {
        return `https://steamcommunity.com/inventory/${steamID}/${appID}/2?l=english&count=1000&json=1`;
    }
};

module.exports = class API{
    constructor(key){
        /**
         * @name                  getPlayerCount
         * @description           Get back player count from specified Steam app ID.
         * @author                m.
         * @param   {String}      appID                 Specify an app ID to get data from.
         * 
         * @returns {String}
         */
        this.getPlayerCount = async appID => {
            return await axios.get(urls.getPlayerCount(key, appID)).then((response) => {
                return response.data.response.player_count;
            }).catch((err) => { return err; }).toString();
        }
        /**
         * @name                  getPlayerSummaries
         * @description           Get back player data from specified SteamID64.
         * @author                m.
         * @param   {String}      steamID                Specify an SteamID64 to get data from.
         * 
         * @returns {Object}
         */
        this.getPlayerSummaries = async steamID => {
            return await axios.get(urls.getPlayerSummaries(key, steamID)).then((response) => {
                return response.data.response.players[0];
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserGroups
         * @description           Get back user groups list from specified SteamID64.
         * @author                m.
         * @param   {String}      steamID                Specify an SteamID64 to get data from.
         * 
         * @returns {Array}
         */
        this.getUserGroups = async steamID => {
            return await axios.get(urls.getUserGroups(key, steamID)).then((response) => {
                let groups = []; response.data.response.groups.forEach((group) => { groups.push(group.gid); });
                return groups;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  resolveVanityUrl
         * @description           Get back user SteamID64 from VanityURL.
         * @author                m.
         * @param   {String}      vanityURL              Specify an VanityURL to get SteamID64 from.
         * 
         * @returns {String}
         */
        this.resolveVanityUrl = async vanityURL => {
            return await axios.get(urls.resolveVanityUrl(key, vanityURL)).then((response) => {
                if(response.data.response.success) return response.data.response.steamid;
                return `Couldn't find SteamID for specified VanityURL!`
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserBans
         * @description           Get user ban stats from SteamID64.
         * @author                m.
         * @param   {String}      steamID                Specify an steamID to get ban stats from.
         * 
         * @returns {Object}
         */
        this.getUserBans = async steamID => {
            return await axios.get(urls.getUserBans(key, steamID)).then((response) => {
                return {
                    communityBanned: response.data.players[0].CommunityBanned,
                    economyBanned: response.data.players[0].EconomyBan,
                    vacBanned: response.data.players[0].VACBanned,
                    numberOfVacBans: response.data.players[0].NumberOfVACBans,
                    sinceLastBan: response.data.players[0].DaysSinceLastBan,
                    numberOfGameBans: response.data.players[0].NumberOfGameBans,
                }
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getGameAchievements
         * @description           Get list of achievements from specified appID.
         * @author                m.
         * @param   {String}      appID              Specify an appID to get achievements Array back.
         * 
         * @returns {Array}
         */
        this.getGameAchievements = async appID => {
            return await axios.get(urls.getGameAchievements(key, appID)).then((response) => {
                let achievements = [];
                response.data.game.availableGameStats.achievements.forEach((game) => {
                    let { displayName, description, icon, icongray, hidden } = game;
                    if(hidden===0) hidden = false; if(hidden===1) hidden = true;
                    achievements.push({
                        name: displayName,
                        description,
                        icon,
                        icongray,
                        hidden
                    })
                })
                return achievements;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserStatsForGame
         * @description           Get user achievements from specified appID.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get statistics from.
         * @param   {String}      appID              Specify an appID to get user statistics from.
         * 
         * @returns {Array}
         */
        this.getUserStatsForGame = async (steamID, appID) => {
            return await axios.get(urls.getUserStatsForGame(key, steamID, appID)).then((response) => {
                return response.data.playerstats.stats;
            }).catch((err) => { return err; });
        },
        /**
         * @name                  getSteamGames
         * @description           Returns Steam games from store.
         * @author                m.
         * 
         * @returns {Array}
         */
        this.getSteamGames = async () => {
            return await axios.get(urls.getSteamGames(key)).then((response) => {
                return response.data.response.apps;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getSteamSoftware
         * @description           Returns Steam software from store.
         * @author                m.
         * 
         * @returns {Array}
         */
        this.getSteamSoftware = async () => {
            return await axios.get(urls.getSteamSoftware(key)).then((response) => {
                return response.data.response.apps;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserBadges
         * @description           Returns user owned Steam badges.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get badges from.
         * 
         * @returns {Array}
         */
        this.getUserBadges = async steamID => {
            return await axios.get(urls.getUserBadges(key, steamID)).then((response) => {
                return response.data.response.badges;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserCommunityBadgeProgress
         * @description           Returns user Community Badge progress.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get badge progress from.
         * 
         * @returns {Array}
         */
        this.getUserCommunityBadgeProgress = async steamID => {
            return await axios.get(urls.getUserCommunityBadgeProgress(key, steamID)).then((response) => {
                return response.data.response.quests;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserDisplayedBadge
         * @description           Returns user's displayed badge details.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get badge details from.
         * 
         * @returns {Object}
         */
        this.getUserDisplayedBadge = async steamID => {
            return await axios.get(urls.getUserDisplayedBadge(key, steamID)).then((response) => {
                return response.data.response;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserGames
         * @description           Returns list of user's owned games.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get game details from.
         * 
         * @returns {Object}
         */
        this.getUserGames = async steamID => {
            return await axios.get(urls.getUserGames(key, steamID)).then((response) => {
                return {
                    gameCount: response.data.response.game_count,
                    games: response.data.response.games
                }
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserCustomizationDetails
         * @description           Returns user's profile customization details.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get user customization details from.
         * 
         * @returns {Object}
         */
        this.getUserCustomizationDetails = async steamID => {
            return await axios.get(urls.getUserCustomizationDetails(key, steamID)).then((response) => {
                return response.data.response.customizations;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserProfileItemsEquipped
         * @description           Returns user's profile items equipped.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get equipped items details from.
         * 
         * @returns {Object}
         */
        this.getUserProfileItemsEquipped = async steamID => {
            return await axios.get(urls.getUserProfileItemsEquipped(key, steamID)).then((response) => {
                return {
                    profileBackground: {
                        itemName: response.data.response.profile_background.name,
                        itemDescription: response.data.response.profile_background.item_description,
                        imageUrl: `http://media.steampowered.com/steamcommunity/public/images/${response.data.response.profile_background.image_large}`,
                        itemId: response.data.response.profile_background.communityitemid,
                        appId: response.data.response.profile_background.appid
                    },
                    miniProfileBackground: {
                        itemName: response.data.response.mini_profile_background.name,
                        itemDescription: response.data.response.mini_profile_background.item_description,
                        imageUrl: `http://media.steampowered.com/steamcommunity/public/images/${response.data.response.mini_profile_background.image_large}`,
                        itemId: response.data.response.mini_profile_background.communityitemid,
                        appId: response.data.response.mini_profile_background.appid
                    },
                    avatarFrame: {
                        itemName: response.data.response.avatar_frame.name,
                        itemDescription: response.data.response.avatar_frame.item_description,
                        imageUrl: `http://media.steampowered.com/steamcommunity/public/images/${response.data.response.avatar_frame.image_large}`,
                        itemId: response.data.response.avatar_frame.communityitemid,
                        appId: response.data.response.avatar_frame.appid
                    },
                    animatedAvatar: {
                        itemName: response.data.response.animated_avatar.name,
                        itemDescription: response.data.response.animated_avatar.item_description,
                        imageUrl: `http://media.steampowered.com/steamcommunity/public/images/${response.data.response.animated_avatar.image_large}`,
                        itemId: response.data.response.animated_avatar.communityitemid,
                        appId: response.data.response.animated_avatar.appid
                    },
                    profileModifier: {
                        itemName: response.data.response.profile_modifier.name,
                        itemDescription: response.data.response.profile_modifier.item_description,
                        imageUrl: `http://media.steampowered.com/steamcommunity/public/images/${response.data.response.profile_modifier.image_large}`,
                        itemId: response.data.response.profile_modifier.communityitemid,
                        appId: response.data.response.profile_modifier.appid
                    },
                    steamDeckKeyboardSkin: {
                        itemName: response.data.response.steam_deck_keyboard_skin.name,
                        itemDescription: response.data.response.steam_deck_keyboard_skin.item_description,
                        imageUrl: `http://media.steampowered.com/steamcommunity/public/images/${response.data.response.steam_deck_keyboard_skin.image_large}`,
                        itemId: response.data.response.steam_deck_keyboard_skin.communityitemid,
                        appId: response.data.response.steam_deck_keyboard_skin.appid
                    }
                }
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserRecentlyPlayedGames
         * @description           Returns user's recently played games count and list.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get recently played games from.
         * 
         * @returns {Object}
         */
        this.getUserRecentlyPlayedGames = async steamID => {
            return await axios.get(urls.getUserRecentlyPlayedGames(key, steamID)).then((response) => {
                return {
                    gameCount: response.data.response.total_count,
                    games: response.data.response.games
                }
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getUserLevel
         * @description           Returns user's Steam level.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get level details from.
         * 
         * @returns {String}
         */
        this.getUserLevel = async steamID => {
            return await axios.get(urls.getUserLevel(key, steamID)).then((response) => {
                return response.data.response.player_level;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getLevelDistribution
         * @description           Returns data about Steam level distribution.
         * @author                m.
         * @param   {String}      playerLevel        Specify an Steam level to get distribution details from.
         * 
         * @returns {String}
         */
        this.getLevelDistribution = async playerLevel => {
            return await axios.get(urls.getLevelDistribution(key, playerLevel)).then((response) => {
                return response.data.response.player_level_percentile;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getAppNews
         * @description           Returns news of providen appID.
         * @author                m.
         * @param   {String}      appID               Specify an appID get news from.
         * 
         * @returns {String}
         */
        this.getAppNews = async appID => {
            return await axios.get(urls.getAppNews(key, appID)).then((response) => {
                return response.data.appnews.newsitems;
            }).catch((err) => { return err; });
        }
        /**
         * @name                  getInventory
         * @description           Returns Array with inventory items.
         * @author                m.
         * @param   {String}      appID               Specify an appID to get inventory from.
         * @param   {String}      steamID             Specify an steamID to get inventory from.
         * 
         * @returns {Array}
         */
        this.getInventory = async (appID, steamID) => {
            const items = [];
            await axios.get(urls.getInventory(appID, steamID))
                .then(function (response) {
                    response.data.descriptions.forEach(item => {
                        const { market_name, appid, actions, icon_url_large, tradable, marketable, tags, name_color, type } = item;
                        const tagList = [];
                        tags.forEach(tag => tagList[tag.category] = tag.localized_tag_name);
                        items.push({
                            appId: appid,
                            itemName: market_name,
                            itemTradeable: tradable ? true : false,
                            itemMarketable: marketable ? true : false,
                            inspectLink: actions[0].link || null,
                            itemNameColor: name_color,
                            itemType: type,
                            imageUrl: `https://community.akamai.steamstatic.com/economy/image/${icon_url_large}`,
                            tags: tagList
                        })
                    })
                })
                .catch(function (error) {
                    return error;
                })
                .finally(function () {});
            return items;
        }
    }
}