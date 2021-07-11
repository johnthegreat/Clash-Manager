const _ = require('lodash');
const createUuid = require('./utils/createUuid');
const ClanProvider = require('./controllers/db/ClanProvider');
const clanProvider = new ClanProvider();

const PlayerProvider = require('./controllers/db/PlayerProvider');
const playerProvider = new PlayerProvider();

const Clan = require('./models/Clan');
const Player = require('./models/Player');

const clashApiManager = require('./ClashApiManager');

/**
 *
 * @param {Player[]} currentPlayers
 * @param {object[]} newMembers
 * @returns {Player[]}
 * @private
 */
const _getPlayersNotInMemberList = function(currentPlayers,newMembers) {
	const newMemberTags = _.map(newMembers,function(e) {
		return e.tag;
	}).sort();
	return _.filter(currentPlayers,function(player) {
		return newMemberTags.indexOf(player.tag) === -1;
	});
}

const ClashApiLoader = function() {
	this.load = async function() {
		const clanInfo = await clashApiManager.getClashApi().clanByTag(process.env.CLASH_CLAN_TAG);

		let clan = await clanProvider.getClanByTag(clanInfo.tag);
		if (clan === null) {
			clan = Clan.create(clanInfo);
			clan.uuid = createUuid();
			await clanProvider.createClan(clan);
		}

		const currentPlayers = await playerProvider.getPlayers();

		if (clanInfo['memberList'].length > 0) {
			const playersNoLongerInClan = _getPlayersNotInMemberList(currentPlayers,clanInfo['memberList']);
			if (playersNoLongerInClan.length > 0) {
				for(let i=0;i<playersNoLongerInClan.length;i++) {
					const player = playersNoLongerInClan[i];
					await playerProvider.deletePlayerById(player.uuid);
				}
			}

			for (let i=0;i< clanInfo['memberList'].length;i++) {
				const clashPlayer = clanInfo['memberList'][i];
				let player = await playerProvider.getPlayerByTag(clashPlayer.tag);
				if (player === null) {
					player = Player.create(clashPlayer);
					player.uuid = createUuid();
					await playerProvider.createPlayer(player);
				}
			}
		}

		return true;
	};

	// TODO
	this.loadWarLog = async function() {
		try {
			const clashWarLog = await clashApiManager.getClashApi().clanWarlogByTag(process.env.CLASH_CLAN_TAG);
			console.log(JSON.stringify(clashWarLog));
		} catch (e) {
			console.log(e);
		}
	};
};
const clashApiLoader = new ClashApiLoader();
module.exports = clashApiLoader;
