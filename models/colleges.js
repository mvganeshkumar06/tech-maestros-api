const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const collegeSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
});

const colleges = model('colleges', collegeSchema);

module.exports = colleges;
