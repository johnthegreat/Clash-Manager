'use strict';
const Player = function() {
	this.uuid = null;
	this.name = null;
	this.tag = null;
	this.phoneNumber = null;
};
Player.create = function(object) {
	let player = new Player();
	player.uuid = object['uuid'] ? object['uuid'] : null;
	player.name = object['name'] ? object['name'] : null;
	player.tag = object['tag'] ? object['tag'] : null;
	player.phoneNumber = object['phoneNumber'] ? object['phoneNumber'] : null;
	return player;
};
module.exports = Player;
