const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postsSchema = new Schema({
	title: {
		type: String,
		required: [true, 'post name is required'],
	},
	description: {
		introduction: {
			type: String,
			required: [true, 'post intro is required'],
		},
		type: {
			type: String,
			required: [true, 'post type is required'],
		},
		locations: [
			{
				type: String,
				required: [true, 'post locations is required'],
			},
		],
		deadline: {
			type: Date,
		},
	},
	company: {
		type: Schema.Types.ObjectId,
		ref: 'companies',
	},
	requirements: [
		{
			branches: [
				{
					type: String,
				},
			],
			grade: {
				type: Number,
			},
			skills: [
				{
					type: String,
				},
			],
		},
	],
	pay: {
		type: Number,
		required: [true, 'post pay is required'],
	},
	colleges: [
		{
			type: Schema.Types.ObjectId,
			ref: 'colleges',
		},
	],
	registeredStudents: [
		{
			type: Schema.Types.ObjectId,
			ref: 'students',
		},
	],
});

const posts = model('posts', postsSchema);

module.exports = posts;
