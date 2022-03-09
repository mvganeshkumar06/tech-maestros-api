const express = require('express');
const router = express.Router();
const Students = require('../models/students');
const Colleges = require('../models/colleges');
const Companies = require('../models/companies');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
	try {
		const { userType, email, password } = req.body;
		let existingUser;
		if (userType === 'student') {
			existingUser = await Students.findOne({ collegeEmail: email });
		} else if (userType === 'college') {
			existingUser = await Colleges.findOne({ email: email });
		} else if (userType === 'company') {
			existingUser = await Companies.findOne({ email: email });
		}
		if (existingUser) {
			return res.status(409).json({
				errorMessage: 'Email already exists, please try a different email',
			});
		}
		req.body.password = await bcrypt.hash(password, 10);
		let user;
		if (userType === 'student') {
			user = await new Students(req.body);
		} else if (userType === 'college') {
			user = await new Colleges(req.body);
		} else if (userType === 'company') {
			user = await new Companies(req.body);
		}
		await user.save();
		res.status(201).json(user.id);
	} catch (error) {
		res.status(500).json({ errorMessage: error.message });
	}
};

router.post('/register', async (req, res) => {
	try {
		registerUser(req, res);
	} catch (error) {
		res.status(500).json({ errorMessage: error.message });
	}
});

const loginUser = async (req, res) => {
	const { userType, email, password } = req.body;
	let existingUser;
	if (userType === 'student') {
		existingUser = await Students.findOne({ collegeEmail: email });
	} else if (userType === 'college') {
		existingUser = await Colleges.findOne({ email: email });
	} else if (userType === 'company') {
		existingUser = await Companies.findOne({ email: email });
	}
	if (!existingUser) {
		return res.status(401).json({ errorMessage: 'Wrong email, please try again' });
	}
	const isAuthenticated = await bcrypt.compare(password, existingUser.password);
	if (isAuthenticated) {
		const accessToken = jwt.sign(
			{ id: existingUser._id, name: existingUser.name },
			process.env.SERVER_SECRET,
		);
		return res.json({ accessToken });
	}
	res.status(401).json({ errorMessage: 'Wrong password, please try again' });
};

router.post('/login', async (req, res) => {
	try {
		loginUser(req, res);
	} catch (error) {
		res.status(500).json({ errorMessage: error.message });
	}
});

module.exports = router;
