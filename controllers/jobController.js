const Job = require('../models/Job');
const connectDB = require('../db');
const mongoose = require('mongoose');

// Get all published jobs
const getJobs = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    
    const jobs = await Job.find({ status: 'published' });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error in getJobs:', error);
    res.status(500).json({ 
      message: 'Error fetching jobs',
      error: error.message
    });
  }
};

// Get all draft jobs
const getDrafts = async (req, res) => {
  try {
    const drafts = await Job.find({ status: 'draft' });
    res.status(200).json(drafts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drafts' });
  }
};

// Get single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job' });
  }
};

// Create new job/draft
const createJob = async (req, res) => {
  try {
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
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const updatedData = {
      ...req.body,
      logo: req.file ? `/uploads/${req.file.filename}` : job.logo
    };

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

// Get logo URL
const getLogoUrl = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    if (!job.logo) {
      return res.status(404).json({ message: 'No logo found for this job' });
    }

    // Construct the full URL
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const logoUrl = `${baseUrl}${job.logo}`;
    
    res.status(200).json({ logoUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logo URL' });
  }
};

module.exports = {
  getJobs,
  getDrafts,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getLogoUrl
};
