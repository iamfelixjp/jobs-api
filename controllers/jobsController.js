const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

// GET ALL JOBS
const getAllJobs = async (req, res) => {
  const job = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
  // console.log(job);
  res.status(StatusCodes.OK).json({ job, count: job.length });
};

// CREATE JOB
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json(job);
};

// GET SINGLE JOB
const getSingleJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job found for this id ${jobId}`);
  }
  res.status(StatusCodes.OK).json(job);
};

// EDIT/UPDATE JOB
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job found for this id ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
};

// DELETE JOB
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job found for this id ${jobId}`);
  }
  res.status(StatusCodes.OK).send(`Job with id ${jobId} successfully deleted`);
};

module.exports = {
  getAllJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
};
