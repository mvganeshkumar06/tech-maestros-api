const express = require('express');
const router = express.Router();
const Colleges = require('../models/colleges');

router.get('/', async (req, res) => {
	try {
		const allColleges = await Colleges.find({}).select('_id name code');
		res.json(allColleges);
	} catch (error) {
		res.json({ errorMessage: error.message });
	}
});

router.get('/:collegeId', async (req, res) => {
	try {
		const { collegeId } = req.params;
		const college = await Colleges.findById(collegeId);
		return res.json(college);
	} catch (error) {
		res.status(400).json({
			errorMessage: "Can't find a college with the given id",
		});
	}
});

router.post('/:collegeId', async (req, res) => {
	const { collegeId } = req.params;
	try {
		const college = await Colleges.findByIdAndUpdate(collegeId, req.body, { new: true });
		res.status(200).json(college);
	} catch (err) {
		console.log('Error while updating college profile', err);
	}
});

module.exports = router;
