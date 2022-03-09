const express = require('express');
const router = express.Router();
const Students = require('../models/students');
const Colleges = require('../models/colleges');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
	try {
		const userType = req.body.userType;
		let Model, email, existingUser;
		if (userType === 'student') {
			Model = Students;
			email = req.body.collegeEmail;
			existingUser = await Model.findOne({ collegeEmail: email });
		} else if (userType === 'college') {
			Model = Colleges;
			email = req.body.email;
			existingUser = await Model.findOne({ email: email });
		}
		if (existingUser) {
			return res.status(409).json({
				errorMessage: 'Email already exists, please try a different email',
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
		registerUser(req, res);
	} catch (error) {
		res.status(500).json({ errorMessage: error.message });
	}
});

const loginUser = async (req, res) => {
	const userType = req.body.userType,
		password = req.body.password;
	let Model, email, existingUser;
	if (userType === 'student') {
		Model = Students;
		email = req.body.collegeEmail;
		existingUser = await Model.findOne({ collegeEmail: email });
	} else if (userType === 'college') {
		Model = Colleges;
		email = req.body.email;
		existingUser = await Model.findOne({ email: email });
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
