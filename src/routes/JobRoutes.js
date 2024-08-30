const router = require("express").Router();

const { isAuthenticatedUser, authorisedRoles } = require("../middlewares/auth");
const {
  JobPosting,
  getAllJobs,
  jobApply,
  getMyJobs,
  getJob,
} = require("../controllers/JobController");

router
  .route("/jobposting")
  .post(isAuthenticatedUser, authorisedRoles("HR"), JobPosting);
router.route("/jobs").get(getAllJobs);
router.route("/hr/job/:id").get(isAuthenticatedUser, authorisedRoles("HR"), getJob);
router
  .route("/hr/jobs")
  .get(isAuthenticatedUser, authorisedRoles("HR"), getMyJobs);
router.route("/job/apply").put(isAuthenticatedUser, jobApply);

module.exports = router;
