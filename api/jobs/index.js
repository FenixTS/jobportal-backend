const mongoose = require('mongoose');
const Job = require('../../models/Job');

// MongoDB Connection
const MONGODB_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Handle GET request
    if (req.method === 'GET') {
      const jobs = await Job.find({ status: 'published' });
      res.status(200).json(jobs);
      return;
    }

    // Handle other methods
    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Error fetching jobs',
      error: error.message 
    });
  }
}; 