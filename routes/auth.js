const express = require('express');
const router = express.Router();
const Students = require('../models/students');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, Model) => {
	try {
		const { registrationNumber } = req.body;
		const isUserExisting = await Model.findOne({
			registrationNumber: registrationNumber,
		});
		if (isUserExisting) {
			return res.status(409).json({
				errorMessage:
					'Registeration number already exists, please try a different registeration number',
			});
		}
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const user = await new Model(req.body);
		await user.save();
		res.status(201).json(user.id);
	} catch (error) {
		res.status(500).json({ errorMessage: error.message });
	}
};

router.post('/register', async (req, res) => {
	try {
		const { user } = req.body;
		if (user === 'student') {
			registerUser(req, res, Students);
		}
	} catch (error) {
		res.status(500).json({ errorMessage: error.message });
	}
});

const loginUser = async (req, res, Model) => {
	const { registrationNumber, password } = req.body;
	const user = await Model.findOne({ registrationNumber: registrationNumber });
	if (!user) {
		return res
			.status(401)
			.json({ errorMessage: 'Wrong registeration number, please try again' });
	}
	const isAuthenticated = await bcrypt.compare(password, user.password);
	if (isAuthenticated) {
		const accessToken = jwt.sign({ id: user._id, name: user.name }, process.env.SERVER_SECRET);
		return res.json({ accessToken });
	}
	res.status(401).json({ errorMessage: 'Wrong password, please try again' });
};

router.post('/login', async (req, res) => {
	try {
		const { user } = req.body;
		if (user === 'student') {
			loginUser(req, res, Students);
		}
	} catch (error) {
		res.status(500).json({ errorMessage: error.message });
	}
});

module.exports = router;
