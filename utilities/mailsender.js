const nodemailer = require('nodemailer');
const htmltemplate = require('./htmltemplate');

const sendMails = (email) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'erenyaegar158@gmail.com',
			pass: 'simple@AOT',
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	const mailOptions = {
		from: 'erenyaegar158@gmail.com',
		to: email,
		subject: 'Applied for the Job',
		html: htmltemplate,
	};

	transporter.sendMail(mailOptions, function (err, success) {
		if (err) {
			console.log(err);
		} else {
			console.log('Email sent successfully');
		}
	});
};

module.exports = sendMails;
