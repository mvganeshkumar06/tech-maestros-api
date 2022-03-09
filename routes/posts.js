const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Posts = require('../models/posts');
const Companies = require('../models/companies');

router.post('/', async (req, res) => {
	try {
		const { company } = req.body;
		const postcompany = await Companies.find({ _id: company });
		if (postcompany) {
			const post = await new Posts(req.body);
			await post.save();
			res.json(post);
		}
	} catch (error) {
		res.json({ errorMessage: error.message });
	}
});

router.post('/:postId', async (req, res) => {
	const { postId } = req.params;
	try {
		const updatedPost = await Posts.findByIdAndUpdate(postId, req.body, { new: true });
		res.status(200).json(updatedPost);
	} catch (err) {
		console.log('Error while updating student profile', err);
	}
});

router.post('/:postId/registeredStudents', async (req, res) => {
	try {
		const { postId } = req.params;
		const { studentId } = req.body;
		const post = await Posts.findById({ _id: postId });
		const { registeredStudents } = post;
		const updatedResgisteredStudent = [
			...registeredStudents,
			new mongoose.Types.ObjectId(studentId),
		];
		const updatedPost = await Posts.findByIdAndUpdate(
			postId,
			{ registeredStudents: updatedResgisteredStudent },
			{
				new: true,
			},
		);
		res.json(updatedPost);
	} catch (err) {
		console.log('Error while updating student profile', err);
	}
});

module.exports = router;
