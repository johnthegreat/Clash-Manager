'use strict';
function EditPlayerModal(player,saveCallback) {
	const modal = this;
	this.element = null;

	this.init = function() {
		this.element.on('hidden.bs.modal',function() {
			this.element.remove();
		}.bind(this));

		this.element.find('button[data-dismiss="modal"]').on('click',function() {
			modal.close();
		});

		let $errorContainer = modal.element.find('#errorContainer');
		this.element.find('button#saveBtn').on('click',function() {
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
				_.each(errors,function(error) {
					$errorContainer.find('ul').append($('<li>').text(error));
				});
				modal.element.find('#phoneNumber').get(0).focus();
			}
		});

		this.setObject(player);

		new Cleave(this.element.find('#phoneNumber').get(0), {
			numericOnly: true,
			blocks: [0, 3, 0, 3, 4],
			delimiters: ['(', ')', ' ', '-'],
		});

		modal.element.on('shown.bs.modal',function() {
			modal.element.find('#phoneNumber').get(0).focus();
		});
	}.bind(this);

	this.load = function() {
		return new Promise(function(resolve, reject) {
			if (EditPlayerModal.modalHtml === null) {
				$.ajax({
					method: 'get',
					url: 'modals/EditPlayer.html',
					success: resolve,
					error: reject
				});
			} else {
				resolve(_.clone(EditPlayerModal.modalHtml));
			}
		}).then(function(modalHtml) {
			EditPlayerModal.modalHtml = _.clone(modalHtml);
			modal.element = $(_.clone(EditPlayerModal.modalHtml));
			modal.init();
		});
	}.bind(this);

	this.open = function() {
		this.element.modal({});
	}.bind(this);

	this.close = function() {
		this.element.modal('hide');
	}.bind(this);

	this.validate = function(object) {
		const errors = [];
		if (_.isEmpty(_.trim(object['name']))) {
			errors.push('Name is required.');
		}
		/*if (_.isEmpty(_.trim(object['phoneNumber']))) {
			errors.push('Phone number is required.');
		}*/
		return errors;
	}.bind(this);

	this.setObject = function(player) {
		this.element.find('#name').val(player.name);
		this.element.find('#phoneNumber').val(player.phoneNumber);
	}.bind(this);

	this.getObject = function() {
		const object = player || {};
		object['name'] = this.element.find('#name').val();
		object['phoneNumber'] = this.element.find('#phoneNumber').val();
		return object;
	}.bind(this);
}
EditPlayerModal.modalHtml = null;
