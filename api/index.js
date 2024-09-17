const app = require('./students');

// This exports the express app so Vercel can treat it as a serverless function
module.exports = (req, res) => {
  app(req, res);
};
