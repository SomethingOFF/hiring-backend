const jobModel = require("../models/jobModel");
const asyncError = require("../middlewares/asyncError");
const ErrorHandler = require("../utils/ErrorHandler");
exports.JobPosting = asyncError(async (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return next(new ErrorHandler("fields are required", 400));
  }
  const job = await jobModel.create({
    name,
    description,
    company: req.user.company,
    hr: req.user,
  });
  res.status(200).json({
    success: true,
    message: "job created successfully",
    job,
  });
});

exports.getAllJobs = asyncError(async (req, res, next) => {
  const jobs = await jobModel.find();
  res.status(200).json({
    success: true,
    jobs,
  });
});
exports.getJob = asyncError(async (req, res, next) => {
  const job = await jobModel.findById(req.params.id);
  res.status(200).json({
    success: true,
    job,
  });
});

exports.getMyJobs = asyncError(async (req, res, next) => {
  const user = await req.user;
  const jobs = await jobModel.find({ hr: user });
  res.status(200).json({
    success: true,
    jobs,
  });
});

exports.jobApply = asyncError(async (req, res, next) => {
  const { jobId } = req.body;
  const seeker = {
    user: req.user._id,
    name: req.user.name,
    resume: req.user.resume,
  };
  const job = await jobModel.findById(jobId);
  const isReviewed = job.users.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (!isReviewed) {
    job.users.push(seeker);
  }
  await job.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
