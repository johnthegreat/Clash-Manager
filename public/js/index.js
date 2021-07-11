'use strict';
window.eventEmitter = new EventEmitter3();
$(function() {
	const clanId = $('input[type="hidden"][name="clanId"]').val();
	const userListWidget = new ComponentUserListWidget($('#userListWidget'));
	const scheduledMessagesWidget = new ComponentScheduledMessagesWidget($('#scheduledMessagesWidget'));

	function loadPlayers() {
		AjaxManager.Player.getPlayers().then(function(players) {
			userListWidget.deleteAllRows();
			_.each(players,function(player) {
				userListWidget.addRow(player);
			});
			$('#numPlayersInClan').text(players.length);
		});
	}

	loadPlayers();

	function reloadClanPlayers() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				method: 'post',
				url: '/api/clan/'+clanId+'/reloadPlayers',
				success: resolve,
				error: reject
			});
		});
	}

	$('#refreshBtn').on('click',function() {
		reloadClanPlayers().then(function() {
			loadPlayers();
		});
	});

	AjaxManager.ScheduledMessages.getScheduledMessages().then(function(scheduledMessages) {
		_.each(scheduledMessages,function(scheduledMessage) {
			scheduledMessagesWidget.addRow(scheduledMessage);
		});
	});

	$('#addPlayerBtn').on('click',function() {
		let createPlayerModal = null;

		const onCreatePlayerSaveCallback = function(object) {
			AjaxManager.Player.createPlayer(object).then(function(player) {
				userListWidget.addRow(player);
				createPlayerModal.close();
			});
		};

		createPlayerModal = new CreatePlayerModal(onCreatePlayerSaveCallback);
		createPlayerModal.load().then(function() {
			createPlayerModal.open();
		});
	});

	$('#addScheduledMessageBtn').on('click',function() {
		const createScheduledMessageModal = new CreateScheduledMessageModal(function(object) {
			AjaxManager.ScheduledMessages.createScheduledMessage(object).then(function(scheduledMessage) {
				scheduledMessagesWidget.addRow(scheduledMessage);
				createScheduledMessageModal.close();
			});
		});
		createScheduledMessageModal.load().then(function() {
			createScheduledMessageModal.open();
		});
	});
});
