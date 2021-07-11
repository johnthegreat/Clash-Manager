const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Clan = require('../../models/Clan');
const ClanProvider = require('../db/ClanProvider');
const clanProvider = new ClanProvider();
const createUuid = require('../../utils/createUuid');

router.get('/api/clan', async function (req, res) {
	const clans = await clanProvider.getClans();
	res.status(200).send(clans);
});

router.get('/api/clan/:id', async function (req, res) {
	const clanId = res.params.id;
	if (!_.isString(clanId)) {
		return res.status(400).send();
	}
	const clan = await clanProvider.getClanById(clanId);
	if (clan === null) {
		return res.status(404).send();
	}
	res.status(200).send(clan);
});

router.post('/api/clan', async function (req, res) {
	let name = req.body['name'];
	let tag = req.body['tag'];

	if (!_.isString(tag) || !_.isString(name)) {
		return res.status(400).send();
	}

	name = name.trim();
	tag = tag.trim();

	if (tag.length === 0 || tag.length > 45) {
		return res.status(400).send();
	} else if (name.length === 0 || name.length > 45) {
		return res.status(400).send();
	}

	let clan = Clan.create({
		name: name,
		tag: tag
	});
	clan.uuid = createUuid();
	clan = await clanProvider.createClan(req.body);
	res.status(201).send(clan);
});

// TODO: This endpoint doesn't seem RESTful
/**
 * @param {Request} req
 * @param {Response} res
 */
router.post('/api/clan/:id/reloadPlayers', async function (req, res) {
	const clashApiLoader = require('../../ClashApiLoader');
	await clashApiLoader.load();
	res.status(204).send();
});

router.delete('/api/clan/:id', async function (req, res) {
	const clanId = req.params.id;
	const clan = await clanProvider.getClanById(clanId);
	if (clan === null) {
		return res.status(404).send();
	}

	await clanProvider.deleteClan(clanId);
	res.status(204).send();
});

module.exports = router;
