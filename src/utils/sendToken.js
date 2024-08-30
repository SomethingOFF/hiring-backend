const sendToken = (user, statuscode, res, message) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };
  res.status(statuscode).cookie("auth", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
