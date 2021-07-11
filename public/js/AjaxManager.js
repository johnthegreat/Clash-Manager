'use strict';
const AjaxManager = {};
AjaxManager.Player = {};
AjaxManager.Player.createPlayer = function(object) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'post',
			url: '/api/player',
			data: object,
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.Player.getPlayers = function() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'get',
			url: '/api/player',
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.Player.getPlayer = function(id) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'get',
			url: '/api/player/'+id,
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.Player.updatePlayer = function(object) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'put',
			url: '/api/player/'+object['uuid'],
			data: object,
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.Player.deletePlayer = function(id) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'delete',
			url: '/api/player/'+id,
			success: resolve,
			error: reject
		});
	});
};

AjaxManager.Clan = {};
AjaxManager.Clan.createClan = function(object) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'post',
			url: '/api/clan',
			data: object,
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.Clan.getClans = function() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'get',
			url: '/api/clan',
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.Clan.getClan = function(id) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'get',
			url: '/api/clan/'+id,
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.Clan.updateClan = function(object) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'put',
			url: '/api/clan/'+object['uuid'],
			data: object,
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.Clan.deleteClan = function(id) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'delete',
			url: '/api/clan/'+id,
			success: resolve,
			error: reject
		});
	});
};

AjaxManager.ScheduledMessages = {};
AjaxManager.ScheduledMessages.createScheduledMessage = function(object) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'post',
			url: '/api/scheduledMessage',
			data: object,
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.ScheduledMessages.getScheduledMessages = function() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'get',
			url: '/api/scheduledMessage',
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.ScheduledMessages.getScheduledMessage = function(id) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'get',
			url: '/api/scheduledMessage/'+id,
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.ScheduledMessages.updateScheduledMessage = function(object) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'put',
			url: '/api/scheduledMessage/'+object['uuid'],
			success: resolve,
			error: reject
		});
	});
};
AjaxManager.ScheduledMessages.deleteScheduledMessage = function(id) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'delete',
			url: '/api/scheduledMessage/'+id,
			success: resolve,
			error: reject
		});
	});
};
