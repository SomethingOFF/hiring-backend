const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const jobRoutes = require("./routes/JobRoutes.js");
const cors = require("cors");
const error = require("./middlewares/error.js");
const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: process.env.VERCEL_DOMAIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api", userRoutes);
app.use("/api", jobRoutes);

app.use(error);

module.exports = app;
