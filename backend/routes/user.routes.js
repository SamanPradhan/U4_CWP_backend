const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register
userRouter.post("/register", async (req, res) => {
  const { email, password, phoneNo, company, designation, companyIndustry } =
    req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({
        email,
        password: hash,
        phoneNo,
        company,
        designation,
        companyIndustry,
      });
      await user.save();
      res.status(200).send({ msg: "Registration has been done!" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//login(authentication)

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login successfull!",
            token: jwt.sign({ userID: user._id }, "timetrack"),
          });
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//getting projects
userRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "timetrack");
  console.log(decoded, token);
  try {
    if (decoded) {
      const users = await UserModel.find();
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(400).send({ msg: "login error", error: err.message });
  }
});
module.exports = {
  userRouter,
};
