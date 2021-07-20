'use strict';

function CreateScheduledMessageModal(saveCallback) {
	const modal = this;
	this.element = null;

	this.init = function () {
		modal.element.on('hidden.bs.modal', function () {
			modal.element.remove();
		});

		modal.element.find('button[data-dismiss="modal"]').on('click', function () {
			modal.close();
		});

		const $errorContainer = modal.element.find('#errorContainer');
		modal.element.find('button#saveBtn').on('click', function () {
			$errorContainer.find('ul > li').remove();
			$errorContainer.hide();

			const object = modal.getObject();
			const errors = modal.validate(object);
			if (errors.length === 0) {
				if (_.isFunction(saveCallback)) {
					saveCallback(object);
				}
			} else {
				$errorContainer.show();
				_.each(errors, function (error) {
					$errorContainer.find('ul').append($("<li>").text(error));
				});
			}
		});

		AjaxManager.Player.getPlayers().then(function (players) {
			const $select = modal.element.find('select#player');
			const template = Handlebars.compile('<option value="{{uuid}}">{{name}}</option>');
			_.each(players, function (player) {
				if (player.phoneNumber === null) {
					return;
				}
				$select.append(template(player));
			});
		});

		modal.element.find('#scheduledAt').datetimepicker({
			minDate: moment().add(5, 'minutes'),
			maxDate: moment().add(7, 'days').endOf('day'),
			stepping: 5,
			useStrict: true,
			disabledHours: [0, 1, 2, 3, 4, 5, 6, 7],
			sideBySide: true
		});

		Countable.on(modal.element.find('textarea#message').get(0), function (counter) {
			modal.element.find('#numChars').text(counter.all);
		});

		modal.element.on('shown.bs.modal', function () {
			modal.element.find('#scheduledAt').get(0).focus();
		});
	}.bind(this);

	this.load = function () {
		return new Promise(function (resolve, reject) {
			if (CreateScheduledMessageModal.modalHtml === null) {
				$.ajax({
					method: 'get',
					url: 'modals/CreateScheduledMessage.html',
					success: resolve,
					error: reject
				});
			} else {
				resolve(_.clone(CreateScheduledMessageModal.modalHtml));
			}
		}).then(function (modalHtml) {
			CreateScheduledMessageModal.modalHtml = _.clone(modalHtml);
			modal.element = $(_.clone(CreateScheduledMessageModal.modalHtml));
			modal.init();
		});
	}.bind(this);

	this.open = function () {
		modal.element.modal({});
	};

	this.close = function () {
		modal.element.modal('hide');
	};

	this.validate = function (object) {
		const errors = [];
		if (_.trim(object['scheduledAt']).length === 0) {
			errors.push('Scheduled At is required.');
		}
		if (_.trim(object['playerId']).length === 0) {
			errors.push('Player is required.');
		}
		if (_.trim(object['message']).length === 0) {
			errors.push('Message is required.');
		}
		return errors;
	};

	this.getObject = function () {
		const object = {};
		object['scheduledAt'] = modal.element.find('#scheduledAt').val();
		if (!_.isEmpty(object['scheduledAt'])) {
			object['scheduledAt'] = moment(object['scheduledAt'], "MM/DD/YYYY hh:mm A").toISOString();
		}
		object['playerId'] = modal.element.find('#player').val();
		object['message'] = modal.element.find('#message').val();
		return object;
	};
}

CreateScheduledMessageModal.modalHtml = null;
