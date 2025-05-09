const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  workType: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  description: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published'
  },
  logo: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
