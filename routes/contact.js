import express from "express";

import Contact from "../models/contact";
import User from "../models/user";
import checkAuth from "../middlewares/auth";

const Router = express.Router();

// Contact CRUD
Router.get("/", checkAuth, async (req, res) => {
  try {
    const { _userID } = req.user;
    const contacts = await Contact.find({ user: _userID });
    if (!contacts || contacts.length < 1)
      return res
        .status(200)
        .json({ error: true, message: "No contacts found" });
    return res.status(200).json({ error: false, contacts });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ error: true, message: err });
  }
});

Router.get("/:_id", checkAuth, async (req, res) => {
  try {
    const { _userID } = req.user;
    const { _id } = req.params;
    const contact = await Contact.findOne({ _id, user: _userID });
    if (!contact)
      return res
        .status(200)
        .json({ error: true, message: "No such contact found" });
    return res.status(200).json({ error: false, contact });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ error: true, message: err });
  }
});

Router.post("/", checkAuth, async (req, res) => {
  try {
    const { _userID } = req.user;
    const { name, email, phone, country } = req.body;
    const user = await User.findById({ _id: _userID });
    const newcontact = new Contact({
      name,
      email,
      phone,
      country,
      user: _userID
    });
    await newcontact.save();
    user.contacts.push(newcontact);
    await user.save();
    return res.status(201).json({ error: false, contact: newcontact });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: true, message: err });
  }
});

Router.delete("/:_id", checkAuth, async (req, res) => {
  try {
    const { _id } = req.params;
    const { _userID } = req.user;
    console.log("userID", _userID);
    const contact = await Contact.findByIdAndDelete({ _id });
    console.log(contact);
    return res
      .status(200)
      .json({ error: false, message: "Deleted succussfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: true, message: err });
  }
});

Router.patch("/:_id", checkAuth, async (req, res) => {
  try {
    const { _id } = req.params;
    const { _userID } = req.user;
    const { name, email, phone, country } = req.body;
    const contact = await Contact.findOne({ _id, user: _userID });
    contact.name = name;
    contact.email = email;
    contact.country = country;
    contact.phone = phone;
    console.log(contact);
    await contact.save();
    if (!contact)
      return res
        .status(401)
        .json({ error: true, message: "Bad Client Request" });
    return res.status(201).json({ error: false, contact });
  } catch (err) {
    console.log(err);
  }
});

export default Router;
