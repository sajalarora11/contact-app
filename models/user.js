import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contacts: [
    {
      type: Schema.ObjectId,
      ref: "Contact"
    }
  ],
  createAt: {
    type: Date,
    default: Date.now()
  }
});

const User = model("User", userSchema);

export default User;
