const express = require('express');
const cors = require('cors');






const authRoutes = require('./auth/index');
const lectureRoutes = require('./lectures/index');
const questionRoutes = require('./questions/index');
const assignmentRoutes = require('./assignments/index');
const commentRoutes = require('./comments/index');
const classRoutes= require('./classes/index');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/classes', classRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));