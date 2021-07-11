'use strict';
const _ = require('lodash');
const db = require('./DatabaseProvider');
const ClanProvider = function() {};
const Clan = require('../../models/Clan');

// CREATE
ClanProvider.prototype.createClan = function(clan) {
	return new Promise(function(resolve, reject) {
		db.run("INSERT INTO `clan` (uuid,tag,name) VALUES (?,?,?)",[clan.uuid,clan.tag,clan.name],function(err) {
			if (err) {
				return reject(err);
			}

			resolve(clan);
		});
	});
};

// READ
ClanProvider.prototype.getClans = function() {
	return new Promise(function(resolve, reject) {
		db.all("SELECT * FROM `clan`",[],function(err,results) {
			if (err) {
				return reject(err);
			}

			resolve(results);
		});
	});
};

ClanProvider.prototype.getClanById = function(id) {
	return new Promise(function(resolve, reject) {
		db.all("SELECT * FROM `clan` WHERE `uuid` = ?",[id],function(err,results) {
			if (err) {
				return reject(err);
			}

			resolve(results);
		});
	});
};

ClanProvider.prototype.getClanByTag = function(tag) {
	return new Promise(function(resolve, reject) {
		db.all("SELECT * FROM `clan` WHERE `tag` = ?",[tag],function(err,results) {
			if (err) {
				return reject(err);
			}

			if (results.length === 1) {
				resolve(Clan.create(_.first(results)));
			} else {
				resolve(null);
			}
		});
	});
};

// UPDATE
ClanProvider.prototype.updateClan = function(clan) {
	return new Promise(function(resolve, reject) {
		// db.query("UPDATE `clan` SET `` WHERE `uuid` = ?",[player.name,player.phoneNumber,player.uuid],function(err,results) {
		// 	if (err) {
		// 		return reject(err);
		// 	}
		//
		// 	resolve(results);
		// });
	});
};

// DELETE
ClanProvider.prototype.deleteClan = function(clanId) {
	return new Promise(function(resolve, reject) {
		db.run("DELETE FROM `clan` WHERE `uuid` = ?",[clanId],function(err) {
			if (err) {
				return reject(err);
			}

			resolve();
		});
	});
};

module.exports = ClanProvider;
