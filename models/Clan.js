'use strict';
const Clan = function() {
	this.uuid = null;
	this.tag = null;
	this.name = null;
	this.clanLevel = null;
	this.clanPoints = null;
	this.clanVersusPoints = null;
	this.requiredTrophies = null;
	this.warFrequency = null;
	this.warWinStreak = null;
	this.warWins = null;
	this.isWarLogPublic = null;
};
/**
 *
 * @param object
 * @returns {Clan}
 */
Clan.create = function(object) {
	const clan = new Clan();
	clan.uuid = object['uuid'] ? object['uuid'] : null;
	clan.tag = object['tag'] ? object['tag'] : null;
	clan.name = object['name'] ? object['name'] : null;
	clan.clanLevel = object['clanLevel'] ? object['clanLevel'] : null;
	clan.clanPoints = object['clanPoints'] ? object['clanPoints'] : null;
	clan.clanVersusPoints = object['clanVersusPoints'] ? object['clanVersusPoints'] : null;
	clan.requiredTrophies = object['requiredTrophies'] ? object['requiredTrophies'] : null;
	clan.warFrequency = object['warFrequency'] ? object['warFrequency'] : null;
	clan.warWinStreak = object['warWinStreak'] ? object['warWinStreak'] : null;
	clan.warWins = object['warWins'] ? object['warWins'] : null;
	return clan;
};
module.exports = Clan;
