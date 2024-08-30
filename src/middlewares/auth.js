const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const asyncError = require("./asyncError");

exports.isAuthenticatedUser = asyncError(async (req, res, next) => {
  const { auth } = req.cookies;
  if (!auth) {
    return next(new ErrorHandler("checkout for authentication", 400));
  }
  const data = require("jsonwebtoken").verify(auth, process.env.SECRET_KEY);
  req.user = await userModel.findById(data.id);
  next();
});

exports.authorisedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error(`Role is not authorised for this page`, 400));
    }
    next();
  };
};
