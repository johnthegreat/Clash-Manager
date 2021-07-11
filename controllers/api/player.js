const _ = require('lodash');
const express = require('express');
const router = express.Router();

const PlayerProvider = require('../db/PlayerProvider');
const playerProvider = new PlayerProvider();

const Player = require('../../models/Player');

const createUuid = require('../../utils/createUuid');

router.get('/api/player', async function (req, res) {
	const players = await playerProvider.getPlayers();
	res.status(200).send(players);
});

router.get('/api/player/:id', async function (req, res) {
	const player = await playerProvider.getPlayerById(req.params.id);
	if (player === null) {
		return res.status(404).send();
	}
	res.status(200).send(player);
});

// Not currently used. Players are loaded in from the Clash API.
router.post('/api/player', async function (req, res) {
	let name = req.body['name'];
	let tag = req.body['tag'];
	let phoneNumber = req.body['phoneNumber'];

	if (!_.isString(name) || !_.isString(tag) || !_.isString(phoneNumber)) {
		return res.status(400).send();
	}

	name = name.trim();
	tag = tag.trim();
	phoneNumber = phoneNumber.trim();

	if (name.length === 0 || name.length > 45) {
		return res.status(400).send();
	} else if (tag.length === 0 || tag.length > 45) {
		return res.status(400).send();
	} else if (phoneNumber.length === 0 || phoneNumber.length > 20) {
		return res.status(400).send();
	}

	const player = Player.create({
		name: name,
		tag: tag,
		phoneNumber: phoneNumber
	});
	player.uuid = createUuid();
	await playerProvider.createPlayer(player);
	res.status(201).send(player);
});

router.put('/api/player/:id', async function (req, res) {
	const player = await playerProvider.getPlayerById(req.params.id);
	if (player === null) {
		return res.status(404).send();
	}

	let phoneNumber = req.body['phoneNumber'];
	if (!_.isString(phoneNumber)) {
		return res.status(400).send();
	}
	phoneNumber = phoneNumber.trim();

	player.phoneNumber = phoneNumber.length > 0 ? phoneNumber : null;
	await playerProvider.updatePlayer(player);
	res.status(200).send(player);
});

router.delete('/api/player/:id', async function (req, res) {
	const playerId = req.params.id;
	const player = await playerProvider.getPlayerById(playerId);
	if (player === null) {
		return res.status(404).send();
	}

	await playerProvider.deletePlayerById(playerId);
	res.status(204).send();
});

module.exports = router;
