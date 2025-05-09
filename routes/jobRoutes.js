const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Note: These routes will be prefixed with /api/jobs
router.get('/', jobController.getJobs);
router.post('/', jobController.createJob);
router.get('/:id', jobController.getJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router; 