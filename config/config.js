import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/contact-app", {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("connectied to database...");
  } catch (error) {
    console.log("Connection to DB failed...", error);
    process.exit();
  }
};

export default connectDB;
