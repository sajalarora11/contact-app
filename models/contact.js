import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  country: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: ObjectId,
    ref: "User"
  }
});

const Contact = model("Contact", contactSchema);

export default Contact;
