// Packages
import express from "express";
import bodyParser from "body-parser";
// modules
import User from "./routes/user";
import Contact from "./routes/contact";
import connectDB from "./config/config";

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();

// functional middlewares
app.use(bodyParser.json());

// route middlewares
app.use("/api/user", User);
app.use("/api/contact", Contact);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
