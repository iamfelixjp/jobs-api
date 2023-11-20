const express = require('express');
const router = express.Router();

const {
  getAllJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobsController');

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob);

module.exports = router;
