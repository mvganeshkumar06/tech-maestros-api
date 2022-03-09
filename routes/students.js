const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Students = require('../models/students');

router.get('/', async (req, res) => {
	try {
		const allStudents = await Students.find({})
			.select('_id name registerationNumber college')
			.populate('college', '_id name');
		res.json(allStudents);
	} catch (error) {
		res.json({ errorMessage: error.message });
	}
});

router.get('/:studentId', async (req, res) => {
	try {
		const { studentId } = req.params;
		const student = await Students.findById(studentId).populate('college', '_id name');
		return res.json(student);
	} catch (error) {
		res.status(400).json({
			errorMessage: "Can't find a student with the given id",
		});
	}
});

router.post('/:studentId', async (req, res) => {
	const { studentId } = req.params;
	try {
		const student = await Students.findByIdAndUpdate(
			studentId,
			{
				...req.body,
				college: new mongoose.Types.ObjectId(req.body.collegeId),
			},
			{ new: true },
		);
		res.status(200).json(student);
	} catch (err) {
		console.log('Error while updating student profile', err);
	}
});

module.exports = router;
