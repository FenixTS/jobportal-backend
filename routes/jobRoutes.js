const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getJobs,
  getDrafts,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Routes
router.get('/', getJobs);                    // Get all published jobs
router.get('/drafts', getDrafts);            // Get all draft jobs
router.get('/:id', getJobById);              // Get single job by ID
router.post('/', upload.single('logo'), createJob);  // Create new job/draft
router.put('/:id', upload.single('logo'), updateJob); // Update job
router.delete('/:id', deleteJob);            // Delete job

module.exports = router;
