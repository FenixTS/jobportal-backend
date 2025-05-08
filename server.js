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

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.MONGO_URI}:${PORT}`);
});
  