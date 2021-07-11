const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const router = express.Router();

const createUuid = require('../../utils/createUuid');

const scheduledMessageProvider = require('../db/ScheduledMessageProvider');

const ScheduledMessage = require('../../models/ScheduledMessage');

const scheduledMessageSchedulerService = require('../../ScheduledMessageSchedulerService');

router.get('/api/scheduledMessage', async function (req, res) {
	const scheduledMessages = await scheduledMessageProvider.getScheduledMessages();
	if (scheduledMessages.length > 0) {
		for (let i = 0; i < scheduledMessages.length; i++) {
			await ScheduledMessage.resolve(scheduledMessages[i]);
		}
	}
	res.status(200).send(scheduledMessages);
});

router.get('/api/scheduledMessage/:id', async function (req, res) {
	const uuid = req.params.id;
	if (!_.isString(uuid)) {
		return res.status(400).send();
	}

	const scheduledMessage = await scheduledMessageProvider.getScheduledMessageById(uuid);
	if (scheduledMessage === null) {
		return res.status(404).send();
	}

	await ScheduledMessage.resolve(scheduledMessage);
	res.status(200).send(scheduledMessage);
});

router.post('/api/scheduledMessage', async function (req, res) {
	/*
	 * POST /api/scheduledMessage
	 * Fields: playerId (Required), message (Required), scheduledAt (Required)
	 */

	const playerId = _.isString(req.body['playerId']) ? _.trim(req.body['playerId']) : null;
	const message = _.isString(req.body['message']) ? _.trim(req.body['message']) : null;
	const scheduledAt = _.isString(req.body['scheduledAt']) ? _.trim(req.body['scheduledAt']) : null;

	if (_.isEmpty(playerId) || _.isEmpty(message) || _.isEmpty(scheduledAt)) {
		return res.status(400).send();
	}

	const scheduledMessage = ScheduledMessage.create({
		playerId: playerId,
		message: message,
		scheduledAt: scheduledAt
	});
	scheduledMessage.uuid = createUuid();
	if (!_.isEmpty(scheduledMessage.scheduledAt)) {
		scheduledMessage.scheduledAt = moment(scheduledMessage.scheduledAt);
	}
	await scheduledMessageProvider.createScheduledMessage(scheduledMessage);
	scheduledMessageSchedulerService.scheduleMessage(scheduledMessage);
	await ScheduledMessage.resolve(scheduledMessage);
	res.status(201).send(scheduledMessage);
});

router.delete('/api/scheduledMessage/:id', async function (req, res) {
	const uuid = req.params.id;
	if (!_.isString(uuid)) {
		return res.status(400).send();
	}

	const scheduledMessage = await scheduledMessageProvider.getScheduledMessageById(uuid);
	if (scheduledMessage === null) {
		return res.status(404).send();
	}

	scheduledMessageSchedulerService.cancelScheduledJobByUuid(uuid);
	await scheduledMessageProvider.deleteScheduledMessage(uuid);
	res.status(204).send();
});

module.exports = router;
