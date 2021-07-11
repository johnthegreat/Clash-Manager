'use strict';
// TODO perhaps change implementation to use database instead of memory.

const _ = require('lodash');
const createUuid = require('../../utils/createUuid');

const ScheduledMessageProvider = function() {};
const scheduledMessageProvider = new ScheduledMessageProvider();

let scheduledMessages = {};

// CREATE
ScheduledMessageProvider.prototype.createScheduledMessage = function(scheduledMessage) {
	return new Promise(function(resolve, reject) {
		let key = createUuid();
		scheduledMessage.uuid = key;
		scheduledMessages[key] = scheduledMessage;
		resolve(scheduledMessage);
	});
};

// READ
ScheduledMessageProvider.prototype.getScheduledMessages = function() {
	return new Promise(function(resolve, reject) {
		resolve(_.values(scheduledMessages));
	});
};

ScheduledMessageProvider.prototype.getScheduledMessageById = function(id) {
	return new Promise(function(resolve, reject) {
		resolve(scheduledMessages[id]);
	});
}

// UPDATE
ScheduledMessageProvider.prototype.updateScheduledMessage = function(scheduledMessage) {
	return new Promise(function(resolve, reject) {
		scheduledMessages[scheduledMessage['uuid']] = scheduledMessage;
		resolve(scheduledMessage);
	});
};

// DELETE
ScheduledMessageProvider.prototype.deleteScheduledMessage = function(scheduledMessageId) {
	return new Promise(function(resolve, reject) {
		delete scheduledMessages[scheduledMessageId];
		resolve();
	});
};

module.exports = scheduledMessageProvider;
