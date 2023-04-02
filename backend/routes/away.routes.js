const express = require("express");
const awayRouter = express.Router();
const { awayModel } = require("../model/away.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//adding aways
awayRouter.post("/add", async (req, res) => {
  try {
    const away = new awayModel(req.body);
    await away.save();
    res.status(200).send({ msg: "Your away time is created" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//getting aways
awayRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "timetrack");
  console.log(decoded, token);
  try {
    if (decoded) {
      const aways = await awayModel.find({ userID: decoded.userID });
      res.status(200).send(aways);
    }
  } catch (err) {
    res.status(400).send({ msg: "login error", error: err.message });
  }
});

//editing aways

// awayRouter.patch("/update/:awayID", async (req, res) => {
//   try {
//     const id = req.params.awayID;
//     await awayModel.findByIdAndUpdate(id, req.body);
//     res.status(200).send({ msg: "away is updated" });
//   } catch (error) {
//     res.status(400).send({ msg: "could not update the away" });
//   }
// });

//deleting a away

// awayRouter.delete("/delete/:projectID", async (req, res) => {
//   try {
//     const id = req.params.projectID;
//     await awayModel.findByIdAndRemove({ _id: id });
//     res.status(200).send({ msg: "away is deleted" });
//   } catch (error) {
//     res.status(400).send({ msg: "could not delete the away timer" });
//   }
// });

module.exports = {
  awayRouter,
};
