const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const jobRoutes = require("./routes/JobRoutes.js");
const cors = require("cors")
const error = require("./middlewares/error.js");
const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  'https://hiring-frontend-six.vercel.app',
  'https://hiring-frontend-bnwm5ywhv-prathams-projects-7d3f64fe.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use("/api", userRoutes);
app.use("/api", jobRoutes);

app.use(error);

module.exports = app;
