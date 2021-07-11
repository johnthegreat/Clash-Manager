'use strict';
const ClashApi = require('clash-of-clans-api').ClashApi;

const ClashApiManager = function(token) {
	this.token = token;

	this.clashApi = new ClashApi({
		token: token
	});

	/**
	 * @return {{ClashApi}}
	 */
	this.getClashApi = function() {
		return this.clashApi;
	}.bind(this);
};

const clashApiManager = new ClashApiManager(process.env.CLASH_TOKEN);
module.exports = clashApiManager;
