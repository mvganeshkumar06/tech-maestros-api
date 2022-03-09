const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const collegeSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	code: {
		type: Number,
		required: [true, 'Code is required'],
	},
	description: {
		type: String,
	},
	isVerified: {
		type: Boolean,
	},
	contact: {
		email: {
			type: String,
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
