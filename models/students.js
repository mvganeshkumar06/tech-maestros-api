const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { isEmail } = require('validator');

const studentSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	registrationNumber: {
		type: String,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	college: {
		type: Schema.Types.ObjectId,
		ref: 'colleges',
	},
	branch: {
		type: String,
	},
	dob: {
		type: Date,
	},
	phone: {
		type: String,
	},
	collegeEmail: {
		type: String,
		validate: {
			validator: (email) => isEmail(email),
			message: 'Please enter a correct email',
		},
		required: [true, 'Email is required'],
	},
	personalEmail: {
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
		type: String,
	},
	education: {
		secondary: {
			name: {
				type: String,
			},
			graduation: {
				month: {
					type: String,
				},
				year: {
					type: String,
				},
			},
			grade: {
				type: Number,
			},
		},
		higherSecondary: {
			name: {
				type: String,
			},
			graduation: {
				month: {
					type: String,
				},
				year: {
					type: String,
				},
			},
			grade: {
				type: Number,
			},
		},
		college: {
			name: {
				type: String,
			},
			graduation: {
				month: {
					type: String,
				},
				year: {
					type: String,
				},
			},
			grade: {
				type: Number,
			},
		},
	},
	skills: [
		{
			type: String,
		},
	],
	projects: [
		{
			name: {
				type: String,
			},
			url: {
				type: String,
			},
			description: [
				{
					type: String,
				},
			],
		},
	],
	experience: [
		{
			title: {
				type: String,
			},
			designation: {
				type: String,
			},
			duration: {
				start: {
					month: {
						type: String,
					},
					year: {
						type: String,
					},
				},
				end: {
					month: {
						type: String,
					},
					year: {
						type: String,
					},
				},
			},
			location: {
				type: String,
			},
			description: [
				{
					type: String,
				},
			],
		},
	],
	acheivements: {
		title: {
			type: String,
		},
		description: [
			{
				type: String,
			},
		],
	},
	interests: [
		{
			type: String,
		},
	],
	isVerified: {
		type: Boolean,
	},
});

const students = model('students', studentSchema);

module.exports = students;
