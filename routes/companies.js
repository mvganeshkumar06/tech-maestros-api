const express = require('express');
const router = express.Router();
const Companies = require('../models/companies');

router.get('/', async (req, res) => {
	try {
		const allcompanies = await Companies.find({}).select('_id name');
		res.json(allcompanies);
	} catch (error) {
		res.json({ errorMessage: error.message });
	}
});

router.get('/:companyId', async (req, res) => {
	try {
		const { companyId } = req.params;
		const company = await Companies.findById({ _id: companyId });
		return res.json(company);
	} catch (error) {
		res.status(400).json({
			errorMessage: "Can't find a company with the given id",
		});
	}
});

router.post('/:companyId', async (req, res) => {
	const { companyId } = req.params;
	try {
		const company = await Companies.findByIdAndUpdate(companyId, req.body, { new: true });
		res.status(200).json(company);
	} catch (err) {
		console.log('Error while updating company profile', err);
	}
});

module.exports = router;
