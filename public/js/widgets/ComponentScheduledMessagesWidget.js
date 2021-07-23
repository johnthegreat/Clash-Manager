const ComponentScheduledMessagesWidget = function(element) {
	'use strict';
	this.element = element;
	const template = Handlebars.compile('<tr data-id="{{uuid}}"><td>{{scheduledAt}}</td><td>{{resolved.player.name}}</td><td>{{message}}</td><td><a data-role="cancelScheduledMessage" role="button">Cancel</a></td></tr>');

	this.addRow = function(object) {
		if (!_.isEmpty(object['scheduledAt'])) {
			object['scheduledAt'] = moment(object['scheduledAt']).format('MM/DD/YYYY h:mm A');
		}
		this.element.find('table > tbody').append(template(object));
	}.bind(this);

	this.deleteRow = function(rowId) {
		this.element.find("table > tbody tr[data-id=\"" + rowId + "\"]").remove();
	}.bind(this);

	this.element.on('click','[data-role="cancelScheduledMessage"]',function(e) {
		const scheduledMessageId = $(e.target).closest('tr[data-id]').attr('data-id');
		AjaxManager.ScheduledMessages.deleteScheduledMessage(scheduledMessageId).then(function() {
			this.deleteRow(scheduledMessageId);
		}.bind(this));
	}.bind(this));
};
