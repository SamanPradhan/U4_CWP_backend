const express = require("express");
const workRouter = express.Router();
const { workModel } = require("../model/workSchedule.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//adding work schedule
workRouter.post("/add", async (req, res) => {
  try {
    const work = new workModel(req.body);
    await work.save();
    res.status(200).send({ msg: "A new work schedule has been created" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//getting work schedule
workRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "timetrack");
  console.log(decoded, token);
  try {
    if (decoded) {
      const works = await workModel.find({ userID: decoded.userID });
      res.status(200).send(works);
    }
  } catch (err) {
    res.status(400).send({ msg: "login error", error: err.message });
  }
});

//editing work schedule

workRouter.patch("/update/:workID", async (req, res) => {
  try {
    const id = req.params.workID;
    await workModel.findByIdAndUpdate(id, req.body);
    res.status(200).send({ msg: "project is updated" });
  } catch (error) {
    res.status(400).send({ msg: "could not update the work schedule" });
  }
});

//deleting work schedule

workRouter.delete("/delete/:workID", async (req, res) => {
  try {
    const id = req.params.workID;
    await workModel.findByIdAndRemove(id);
    res.status(200).send({ msg: "work schedule is deleted" });
  } catch (error) {
    res.status(400).send({ msg: "could not delete the work schedule" });
  }
});
module.exports = {
  workRouter,
};
