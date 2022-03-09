require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./database/connection');
const authRoutes = require('./routes/auth');
const studentsRoutes = require('./routes/students');
const collegeRoutes = require('./routes/colleges');
const companiesRoute = require('./routes/companies');
const postsRoute = require('./routes/posts');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: '*',
		credentials: true,
		optionsSuccessStatus: 200,
	}),
);

connectToDatabase();

app.use('/auth', authRoutes);
app.use('/students', studentsRoutes);
app.use('/colleges', collegeRoutes);
app.use('/companies', companiesRoute);
app.use('/posts', postsRoute);

app.get('/', (req, res) => {
	res.send('Tech Maestros API is running...');
});

app.get('*', (req, res) => {
	res.status(404).send({ errorMessage: 'Route not found' });
});

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});
