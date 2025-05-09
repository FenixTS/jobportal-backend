const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection with updated options
mongoose.connect('mongodb://127.0.0.1:27017/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => {
  console.log('MongoDB Connected Successfully');
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1); // Exit if cannot connect to database
});

// Routes
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/drafts', require('./routes/draftRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 