import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user";
import checkAuth from "../middlewares/auth";

const Router = express.Router();

Router.get("/", checkAuth, async (req, res) => {
  try {
    const { _userID } = req.user;
    const user = await User.findById({ _id: _userID });
    if (!user)
      return res
        .status(401)
        .json({ error: true, message: "Unauthorized request" });
    return res.status(200).json({ error: false, user: user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
});

Router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user)
    return res
      .status(200)
      .json({ error: true, message: "User already exists!" });
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const newUser = new User({
    name,
    email,
    password: hashed
  });
  await newUser.save();
  const token = jwt.sign({ _userID: newUser._id }, "mysecret", {
    expiresIn: "12h"
  });
  if (!token)
    return res
      .status(500)
      .json({ error: true, message: "Internal Server error" });
  return res
    .status(201)
    .json({ error: false, data: { user: { name, email }, token } });
});

Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(200)
        .json({ error: true, message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(200)
        .json({ error: true, message: "Invalid email or password" });
    const token = jwt.sign({ _userID: user._id }, "mysecret", {
      expiresIn: "12h"
    });
    return res.status(200).json({ error: false, token });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ error: true, message: "Invalid email or password" });
  }
});

export default Router;
