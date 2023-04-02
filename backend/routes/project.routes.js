const express = require("express");
const projectRouter = express.Router();
const { projectModel } = require("../model/project.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//adding projects
projectRouter.post("/add", async (req, res) => {
  try {
    const project = new projectModel(req.body);
    await project.save();
    res.status(200).send({ msg: "A new project has been created" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//getting projects
projectRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "timetrack");
  console.log(decoded, token);
  try {
    if (decoded) {
      const projects = await projectModel.find({ userID: decoded.userID });
      res.status(200).send(projects);
    }
  } catch (err) {
    res.status(400).send({ msg: "login error", error: err.message });
  }
});

//editing projects

projectRouter.patch("/update/:projectID", async (req, res) => {
  try {
    const id = req.params.projectID;
    await projectModel.findByIdAndUpdate(id, req.body);
    res.status(200).send({ msg: "project is updated" });
  } catch (error) {
    res.status(400).send({ msg: "could not update the project" });
  }
});

//deleting a project

projectRouter.delete("/delete/:projectID", async (req, res) => {
  try {
    const id = req.params.projectID;
    await projectModel.findByIdAndRemove({ _id: id });
    res.status(200).send({ msg: "project is deleted" });
  } catch (error) {
    res.status(400).send({ msg: "could not delete the project" });
  }
});
module.exports = {
  projectRouter,
};
