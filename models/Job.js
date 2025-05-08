const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: String,
  position: String,
  location: String,
  workType: String,
  experience: String,
  salary: String,
  deadline: String,
  description: [String],
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published'
  },
  logo: String
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
