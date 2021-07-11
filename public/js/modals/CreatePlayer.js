'use strict';
const CreatePlayerModal = function(saveCallback) {
	const modal = this;
	this.element = null;

	this.init = function() {
		this.element.on('hidden.bs.modal',function() {
			this.element.remove();
		}.bind(this));

		this.element.find('button[data-dismiss="modal"]').on('click',function() {
			modal.close();
		});

		this.element.find('button#saveBtn').on('click',function() {
			const object = modal.getObject();
			const errors = modal.validate(object);
			if (errors.length === 0) {
				if (_.isFunction(saveCallback)) {
					saveCallback(object);
				}
			}
		});

		new Cleave(this.element.find('#phoneNumber').get(0), {
			numericOnly: true,
			blocks: [0, 3, 0, 3, 4],
			delimiters: ['(', ')', ' ', '-'],
		});
	}.bind(this);

	this.load = function() {
		return new Promise(function(resolve, reject) {
			if (CreatePlayerModal.modalHtml === null) {
				$.ajax({
					method: 'get',
					url: 'modals/CreatePlayer.html',
					success: resolve,
					error: reject
				});
			} else {
				resolve(_.clone(CreatePlayerModal.modalHtml));
			}
		}).then(function(modalHtml) {
			CreatePlayerModal.modalHtml = _.clone(modalHtml);
			modal.element = $(_.clone(CreatePlayerModal.modalHtml));
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
		if (_.isEmpty(_.trim(object['phoneNumber']))) {
			errors.push('Phone number is required.');
		}
		return errors;
	}.bind(this);

	this.getObject = function() {
		const object = {};
		object['name'] = this.element.find('#name').val();
		object['phoneNumber'] = this.element.find('#phoneNumber').val();
		return object;
	}.bind(this);
}
CreatePlayerModal.modalHtml = null;
