const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const jobRoutes = require('./routes/jobRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve logo images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/jobs', jobRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express API
module.exports = app;
  