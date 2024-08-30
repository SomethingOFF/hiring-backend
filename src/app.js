const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const jobRoutes = require("./routes/JobRoutes.js");
const error = require("./middlewares/error.js");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.VERCEL_DOMAIN,
  })
);
app.use("/api", userRoutes);
app.use("/api", jobRoutes);

app.use(error);

module.exports = app;
