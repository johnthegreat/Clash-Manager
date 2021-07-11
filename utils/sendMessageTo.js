// https://github.com/johnthegreat/DowntimeNotifier/blob/master/sendMessageTo.js
'use strict';
const twilio = require('twilio');
const twilioAccountSid = process.env.twilioAccountSid;
const twilioAuthToken = process.env.twilioAuthToken;
const twilioPhoneNumber = process.env.twilioPhoneNumber;

const twilioClient = new twilio(twilioAccountSid, twilioAuthToken);

const sendMessageTo = function(to,body) {
	return twilioClient.messages.create({
		body: body,
		to: to,
		from: twilioPhoneNumber
	}).then(function(message) {
		console.log(message.sid);
	});
};
module.exports = sendMessageTo;
