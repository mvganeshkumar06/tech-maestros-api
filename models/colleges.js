const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { isEmail } = require('validator');

const collegeSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	code: {
		type: String,
	},
	description: {
		type: String,
	},
	isVerified: {
		type: Boolean,
	},
	email: {
		type: String,
		validate: {
			validator: (email) => isEmail(email),
			message: 'Please enter a correct email',
		},
		required: [true, 'Email is required'],
	},
	website: {
		type: String,
	},
	logo: {
		type: String,
	},
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
	stats: {
		departments: [
			{
				name: {
					type: String,
				},
				description: {
					type: String,
				},
				hodName: {
					type: String,
				},
				totalFaculties: {
					type: Number,
				},
			},
		],
		totalStudents: {
			type: Number,
		},
		totalStudentsPlaced: {
			type: Number,
		},
		package: {
			highest: {
				type: Number,
			},
			average: {
				type: Number,
			},
		},
	},
	companies: [
		{
			type: Schema.Types.ObjectId,
			ref: 'companies',
		},
	],
});

const colleges = model('colleges', collegeSchema);

module.exports = colleges;
