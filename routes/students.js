const express = require('express');
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

module.exports = router;
