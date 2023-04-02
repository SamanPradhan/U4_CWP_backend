const mongoose = require("mongoose");

//user schema
const projectSchema = mongoose.Schema(
  {
    projectName: String,
    perHourCharge: Number,
    estimateCost: Number,
    estimateTime: Number,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const projectModel = mongoose.model("project", projectSchema);

module.exports = {
  projectModel,
};

/*
{
    "projectName": "making whole backend of website",
    "perHourCharge": 150,
    "estimateCost": 12000,
    "estimateTime": 12
  }
  */
