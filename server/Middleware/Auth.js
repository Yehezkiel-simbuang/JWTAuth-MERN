import User from "../Models/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUpMiddleware = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const encryptedPass = bcryptjs.hashSync(password, 10);
    const saveAuth = new User({ username, email, password: encryptedPass });
    await saveAuth.save();
    res.status(201).json({ Message: "User created" });
  } catch (error) {
    next(error);
  }
};

export const signInMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body;
    const valid = await User.findOne({ email });
    if (!valid) {
      next(errorHandler(401, "Email or password incorrect"));
    }

    const validPass = bcryptjs.compareSync(req.body.password, valid.password);

    if (!validPass) {
      next(errorHandler(401, "Email or password incorrect"));
    }

    const token = jwt.sign({ id: valid._id }, process.env.JWT_PASS, {
      expiresIn: 15,
    });
    const { password, ...outRes } = valid._doc;
    res.cookie("token", token, { httpOnly: true, maxAge: 30000 }).status(200).json(outRes);
  } catch (error) {
    next(error);
  }
};

export const googleMiddleware = async (req, res, next) => {
  try {
    const email = req.body.email;
    const valid = await User.findOne({ email });
    if (valid) {
      const token = jwt.sign({ id: valid._id }, process.env.JWT_PASS, {
        expiresIn: 15,
      });
      const { password, ...outRes } = valid._doc;
      res.cookie("token", token, { httpOnly: true, maxAge: 30000 }).status(200).json(outRes);
    } else {
      const pass = (Math.random() * 10 ** 16).toString(36);
      const encryptedPass = bcryptjs.hashSync(pass, 10);
      const username =
        req.body.name.split(" ").join("") + Math.random().toString().slice(-8);
      const googleAuth = new User({
        username,
        email: req.body.email,
        password: encryptedPass,
        photourl: req.body.photourl,
      });
      await googleAuth.save();
      const token = jwt.sign({ id: googleAuth._id }, process.env.JWT_PASS, {
        expiresIn: 15,
      });
      const { password, ...outRes } = googleAuth._doc;
      res.cookie("token", token, { httpOnly: true, maxAge: 30000 }).status(200).json(outRes);
    }
  } catch (error) {
    next(error);
  }
};
export const signoutMiddleware = (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json({ message: "Signout success" });
  } catch (error) {
    next(error);
  }
};

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("test");
      next(errorHandler(401, "Token Not Found"));
      return;
    }

    jwt.verify(token, process.env.JWT_PASS, (error, user) => {
      if (error) next(errorHandler(401, "Token Invalid"));
      res.status(200).json({ status: "Success" });
    })
  } catch (error) {
    next(error)
  }

}
