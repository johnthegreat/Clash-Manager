'use strict';
const _ = require('lodash');
const Player = require('../../models/Player');

const PlayerProvider = function() {};
const playerProvider = new PlayerProvider();

const db = require('./DatabaseProvider');

// CREATE
/**
 *
 * @param {Player} player
 * @returns {Promise<null|Player>}
 */
PlayerProvider.prototype.createPlayer = function(player) {
	return new Promise(function(resolve, reject) {
		db.run("INSERT INTO `player` (uuid,name,tag,phoneNumber) VALUES (?,?,?,?)",[player.uuid,player.name,player.tag,player.phoneNumber],function(err) {
			if (err) {
				return reject(err);
			}

			playerProvider.getPlayerById(player.uuid).then(function(player) {
				resolve(player);
			}).catch(function(err) {
				reject(err);
			})
		});
	});
};

// READ
/**
 *
 * @returns {Promise<Player[]>}
 */
PlayerProvider.prototype.getPlayers = function() {
	return new Promise(function(resolve, reject) {
		db.all("SELECT * FROM `player` ORDER BY `name` ASC",[],function(err,results) {
			if (err) {
				return reject(err);
			}

			resolve(_.map(results,function(result) {
				return Player.create(result);
			}));
		});
	});
};

/**
 *
 * @param {string} tag
 * @returns {Promise<null|Player>}
 */
PlayerProvider.prototype.getPlayerByTag = function(tag) {
	return new Promise(function(resolve, reject) {
		db.all("SELECT * FROM `player` WHERE tag = ?",[tag],function(err,results) {
			if (err) {
				return reject(err);
			}

			if (results.length === 1) {
				resolve(Player.create(_.first(results)));
				return;
			}
			resolve(null);
 		});
	});
};

/**
 *
 * @param {string} id
 * @returns {Promise<null|Player>}
 */
PlayerProvider.prototype.getPlayerById = function(id) {
	return new Promise(function(resolve, reject) {
		db.all("SELECT * FROM `player` WHERE `uuid` = ?",[id],function(err,results) {
			if (err) {
				return reject(err);
			}

			if (results.length === 1) {
				resolve(Player.create(_.first(results)));
			} else {
				resolve(null);
			}
		})
	});
};

// UPDATE
/**
 *
 * @param player
 * @returns {Promise<null|Player>}
 */
PlayerProvider.prototype.updatePlayer = function(player) {
	return new Promise(function(resolve, reject) {
		db.run("UPDATE `player` SET `name` = ?, `phoneNumber` = ? WHERE `uuid` = ?",[player.name,player.phoneNumber,player.uuid],function(err,results) {
			if (err) {
				return reject(err);
			}

			playerProvider.getPlayerById(player.uuid).then(function (player) {
				resolve(player);
			}).catch(function(err) {
				reject(err);
			});
		});
	});
};

// DELETE
PlayerProvider.prototype.deletePlayerById = function(playerId) {
	return new Promise(function(resolve, reject) {
		db.run("DELETE FROM `player` WHERE `uuid` = ?",[playerId],function(err) {
			if (err) {
				return reject(err);
			}

			resolve(null);
		});
	});
};

module.exports = PlayerProvider;
