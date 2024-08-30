const asyncError = require("../middlewares/asyncError");
const userModel = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const ErrorHandler = require("../utils/ErrorHandler");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_SECRET_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

exports.register = asyncError(async (req, res, next) => {
  const { name, email, password, role, company, resume } = req.body;
  const resumeFile = req.file;
  if (resumeFile) {
    let fileUpload;
    try {
      console.log("Resume data:", resume);

      fileUpload = await imagekit.upload({
        file: resumeFile.buffer.toString("base64"),
        fileName: `${name}_resume`,
        folder: "/resumes/",
      });

      console.log("ImageKit Response:", fileUpload);
    } catch (error) {
      return next(new ErrorHandler("File upload failed", 500));
    }

    const user = await userModel.create({
      name,
      email,
      password,
      role,
      company,
      resume: fileUpload.url,
    });
    sendToken(user, 200, res, "User registered successfully");
  } else {
    const user = await userModel.create({
      name,
      email,
      password,
      role,
      company,
    });
    sendToken(user, 200, res, "User registered successfully");
  }
});

exports.login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Check fields again!", 400));
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  sendToken(user, 200, res, "User logged in successfully");
});

exports.logout = asyncError(async (req, res, next) => {
  res.status(200).cookie("auth", null, { httpOnly: true }).json({
    success: true,
    message: "Logged out successfully",
  });
});

exports.getMyself = asyncError(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
  });
});
