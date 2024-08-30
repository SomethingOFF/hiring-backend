const router = require("express").Router();

const { register, getMyself, login } = require("../controllers/UserController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.route("/register").post(upload.single("resume"),register);
router.route("/login").post(login);
router.route("/me").get(isAuthenticatedUser, getMyself);

module.exports = router;
