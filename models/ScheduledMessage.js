'use strict';
const PlayerProvider = require('../controllers/db/PlayerProvider');
const playerProvider = new PlayerProvider();

const ScheduledMessage = function() {
	this.uuid = null;
	this.playerId = null;
	this.message = null;
	this.scheduledAt = null;

	this.resolved = {};
};
ScheduledMessage.create = function(object) {
	const scheduledMessage = new ScheduledMessage();
	scheduledMessage.uuid = object['uuid'] ? object['uuid'] : null;
	scheduledMessage.playerId = object['playerId'] ? object['playerId'] : null;
	scheduledMessage.message = object['message'] ? object['message'] : null;
	scheduledMessage.scheduledAt = object['scheduledAt'] ? object['scheduledAt'] : null;
	return scheduledMessage;
};
ScheduledMessage.resolve = async function(scheduledMessage) {
	if (scheduledMessage.playerId) {
		scheduledMessage.resolved['player'] = await playerProvider.getPlayerById(scheduledMessage.playerId);
	}
	return scheduledMessage;
};
module.exports = ScheduledMessage;
