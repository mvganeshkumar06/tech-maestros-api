const express = require('express');
const router = express.Router();
const Students = require('../models/students');
const Colleges = require('../models/colleges');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerStudent = async (req, res, Students) => {
	try {
		const { registrationNumber } = req.body;
		const isStudentExisting = await Students.findOne({
			registrationNumber: registrationNumber,
		});
		if (isStudentExisting) {
			return res.status(409).json({
				errorMessage:
					'Registeration number already exists, please try a different registeration number',
			});
		}
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const student = await new Students(req.body);
		await student.save();
		res.status(201).json(student.id);
	} catch (error) {
		res.status(500).json({ errorMessage: error.message });
	}
};

const registerCollege = async (req, res, Colleges) => {
	try {
		const { code } = req.body;
		const isUserExisting = await Colleges.findOne({
			code: code,
		});
		if (isUserExisting) {
			return res.status(409).json({
				errorMessage: 'College code already exists, please try a different college code',
			});
		}
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const user = await new Colleges(req.body);
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
			registerStudent(req, res, Students);
		} else if (user == 'college') {
			registerCollege(req, res, Colleges);
		}
	} catch (error) {
		res.status(500).json({ errorMessage: error.message });
	}
});

const loginStudent = async (req, res, Students) => {
	const { registrationNumber, password } = req.body;
	const student = await Students.findOne({ registrationNumber: registrationNumber });
	if (!student) {
		return res
			.status(401)
			.json({ errorMessage: 'Wrong registeration number, please try again' });
	}
	const isAuthenticated = await bcrypt.compare(password, student.password);
	if (isAuthenticated) {
		const accessToken = jwt.sign(
			{ id: student._id, name: student.name },
			process.env.SERVER_SECRET,
		);
		return res.json({ accessToken });
	}
	res.status(401).json({ errorMessage: 'Wrong password, please try again' });
};

const loginCollege = async (req, res, Colleges) => {
	const { code, password } = req.body;
	const college = await Colleges.findOne({ code: code });
	if (!college) {
		return res
			.status(401)
			.json({ errorMessage: 'Wrong registeration number, please try again' });
	}
	const isAuthenticated = await bcrypt.compare(password, college.password);
	if (isAuthenticated) {
		const accessToken = jwt.sign(
			{ id: college._id, name: college.name },
			process.env.SERVER_SECRET,
		);
		return res.json({ accessToken });
	}
	res.status(401).json({ errorMessage: 'Wrong password, please try again' });
};

router.post('/login', async (req, res) => {
	try {
		const { user } = req.body;
		if (user === 'student') {
			loginStudent(req, res, Students);
		} else if (user === 'college') {
			loginCollege(req, res, Colleges);
		}
	} catch (error) {
		res.status(500).json({ errorMessage: error.message });
	}
});

module.exports = router;
