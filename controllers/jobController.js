const Job = require('../models/Job');
const connectDB = require('../config/db');

// Get all published jobs
const getJobs = async (req, res) => {
  try {
    await connectDB();
    const jobs = await Job.find({ status: 'published' });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error in getJobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

// Get all draft jobs
const getDrafts = async (req, res) => {
  try {
    await connectDB();
    const drafts = await Job.find({ status: 'draft' });
    res.status(200).json(drafts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drafts' });
  }
};

// Get single job by ID
const getJobById = async (req, res) => {
  try {
    await connectDB();
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job' });
  }
};

// Create new job
const createJob = async (req, res) => {
  try {
    await connectDB();
    const {
      company,
      position,
      location,
      workType,
      experience,
      salary,
      deadline,
      description,
      status
    } = req.body;

    const logoPath = req.file ? `/uploads/${req.file.filename}` : '';

    const newJob = new Job({
      company,
      position,
      location,
      workType,
      experience,
      salary,
      deadline,
      description: Array.isArray(description) ? description : [description],
      status: status || 'published',
      logo: logoPath
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create job' });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    await connectDB();
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.logo = `/uploads/${req.file.filename}`;
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update job' });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    await connectDB();
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await job.deleteOne();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job' });
  }
};

module.exports = {
  getJobs,
  getDrafts,
  getJobById,
  createJob,
  updateJob,
  deleteJob
}; 