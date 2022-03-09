const mongoose = require('mongoose');

const connectToDatabase = async () => {
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log('Connected to Tech Maestros database successfully');
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = connectToDatabase;
