require('dotenv').config();

const app = require('./students');

// This exports the express app so platforms like Vercel can treat it as a serverless function
module.exports = app;
