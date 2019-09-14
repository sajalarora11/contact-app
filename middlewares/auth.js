import jwt from "jsonwebtoken";

import User from "../models/user";

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ error: true, message: "You're not authorized!" });
    const decodedUser = jwt.verify(token, "mysecret");
    if (findUser(decodedUser._userID)) {
      req.user = decodedUser;
      next();
    } else {
      return res
        .status(401)
        .json({ error: true, message: "You're not authorized!" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ error: true, message: "You're not authorized!" });
  }
};

const findUser = async _id => {
  const user = await User.findById({ _id });
  if (!user) return false;
  else return true;
};

export default checkAuth;
