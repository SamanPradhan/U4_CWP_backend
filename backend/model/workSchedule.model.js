const mongoose = require("mongoose");

//user schema
const workSchema = mongoose.Schema(
  {
    description: String,
    workingFrom: String,
    startTime: Number,
    endTime: Number,
    duration: Number,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const workModel = mongoose.model("workSchedule", workSchema);

module.exports = {
  workModel,
};

/*
{
    "description": "Need to work on website",
    "workingFrom": "Home",
    "startTime": 1500,
    "endTime": 1700,
    "duration": 2
  }
  */
