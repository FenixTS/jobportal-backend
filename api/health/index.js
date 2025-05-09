const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGO_URI;

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
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
    // Check MongoDB connection
    const isConnected = mongoose.connection.readyState === 1;
    
    if (!isConnected) {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
    }

    res.status(200).json({ 
      status: 'ok',
      database: 'connected'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      status: 'error',
      database: 'disconnected',
      error: error.message 
    });
  }
}; 