const ComponentUserListWidget = function(element) {
	'use strict';
	this.element = element;
	const template = Handlebars.compile('<tr data-id="{{uuid}}"><td>{{name}}</td><td>{{phoneNumber}}</td><td><a data-role="editBtn">Edit</a></td></tr>');

	this.addRow = function(object) {
		this.element.find('table > tbody').append(template(object));
	}.bind(this);

	this.deleteAllRows = function() {
		this.element.find('table > tbody > tr').remove();
	}.bind(this);

	this.updateRow = function(rowId,object) {
		this.element.find("table tbody tr[data-id='" + rowId + "']").html(template(object));
	}.bind(this);

	this.element.on('click','tr[data-id] a[data-role="editBtn"]',function(e) {
		const playerId = $(e.target).closest('tr[data-id]').attr('data-id');

		AjaxManager.Player.getPlayer(playerId).then(function(player) {
			const modal = new EditPlayerModal(player,function(object) {
				AjaxManager.Player.updatePlayer(object).then(function(player) {
					window.eventEmitter.emit('onUpdatePlayer',player);
					modal.close();
				});
			});
			modal.load().then(function() {
				modal.open();
			});
		});
	});

	window.eventEmitter.on('onUpdatePlayer',function(player) {
		this.updateRow(player['uuid'],player);
	}.bind(this));
};
