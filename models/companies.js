const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const companySchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	logo: {
		type: String,
	},
	description: {
		type: String,
	},
	industry: {
		type: String,
	},
	isVerified: {
		type: Boolean,
	},
	contact: {
		website: {
			type: String,
		},
		phone: {
			type: String,
		},
		email: {
			type: String,
			validate: {
				validator: (email) => isEmail(email),
				message: 'Please enter a correct email',
			},
		},
		socials: [
			{
				name: {
					type: String,
				},
				url: {
					type: String,
				},
			},
		],
		address: {
			street: {
				type: String,
			},
			city: {
				type: String,
			},
			state: {
				type: String,
			},
		},
	},
	preferredColleges: [{ type: Schema.Types.ObjectId, ref: 'colleges' }],
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'posts',
		},
	],
});

const companies = model('companies', companySchema);

module.exports = companies;
