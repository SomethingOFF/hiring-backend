const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field required"],
  },
  description: {
    type: String,
    required: [true, "name field required"],
  },
  company: {
    type: String,
    required: true,
  },
  hr: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  users: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      resume: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", JobSchema);
