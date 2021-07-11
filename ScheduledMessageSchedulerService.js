'use strict';
const _ = require('lodash');
const schedule = require('node-schedule');
const sendMessageTo = require('./utils/sendMessageTo');

let scheduledJobs = {};

const PlayerProvider = require('./controllers/db/PlayerProvider');
const playerProvider = new PlayerProvider();

const ScheduledMessageSchedulerService = function() {};
ScheduledMessageSchedulerService.prototype.scheduleMessage = function(scheduledMessage) {
	const uuid = scheduledMessage.uuid;
	if (scheduledJobs[uuid]) {
		return;
	}

	if (_.trim(scheduledMessage.playerId).length === 0) {
		// No playerId
		return;
	}

	if (_.trim(scheduledMessage.message).length === 0) {
		// No message
		return;
	}

	console.log('Scheduling',uuid,'for',scheduledMessage.scheduledAt.toDate());
	const scheduledJob = schedule.scheduleJob(scheduledMessage.scheduledAt.toDate(), function() {
		playerProvider.getPlayerById(scheduledMessage.playerId).then(function(player) {
			if (player === null) {
				return;
			}

			if (_.isEmpty(player.phoneNumber)) {
				return;
			}

			console.log('Sending message to', player.phoneNumber, 'message:', scheduledMessage.message);
			sendMessageTo(player.phoneNumber, scheduledMessage.message).catch(function(err) {
				console.error(err);
			}).finally(function() {
				delete scheduledMessage[uuid];
			});
		});
	});
	scheduledJobs[uuid] = scheduledJob;
};

ScheduledMessageSchedulerService.prototype.getScheduledJobByUuid = function(uuid) {
	return scheduledJobs[uuid];
};

ScheduledMessageSchedulerService.prototype.cancelScheduledJobByUuid = function(uuid) {
	let scheduledJob = scheduledJobs[uuid];
	if (scheduledJob) {
		schedule.cancelJob(scheduledJob);
	}
};

const scheduledMessageSchedulerService = new ScheduledMessageSchedulerService();
module.exports = scheduledMessageSchedulerService;
