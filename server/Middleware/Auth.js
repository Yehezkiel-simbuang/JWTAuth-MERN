import User from "../Models/User.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
}

export const signInMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const valid = await User.findOne({ email });
        if (valid) {
            const validPass = bcryptjs.compareSync(password, valid.password);
            if (validPass) {
                const token = jwt.sign({ id: valid._id }, process.env.JWT_PASS, { expiresIn: "2d" });
                const { email, password, ...outRes } = valid._doc;
                res.cookie('token', token, { httpOnly: true }).status(200).json(outRes);
            } else {
                next(errorHandler(401, "Email or password incorrect"));
            }
        } else {
            next(errorHandler(401, "Email or password incorrect"));
        }
    } catch (error) {
        next(error);
    }
}

export const googleMiddleware = async (req, res, next) => {
    try {
        const email = req.body.email;
        const valid = await User.findOne({ email });
        if (valid) {
            const token = jwt.sign({ id: valid._id }, process.env.JWT_PASS, { expiresIn: "2d" });
            const { email, password, ...outRes } = valid._doc;
            res.cookie('token', token, { httpOnly: true }).status(200).json(outRes);
        } else {
            const pass = ((Math.random() * (10 ** 16)).toString(36));
            const encryptedPass = bcryptjs.hashSync(pass, 10);
            const username = req.body.name.split(" ").join("") + Math.random().toString().slice(-8);
            const googleAuth = new User({ username, email: req.body.email, password: encryptedPass });
            await googleAuth.save();
            const token = jwt.sign({ id: googleAuth._id }, process.env.JWT_PASS, { expiresIn: "2d" });
            const { email, password, ...outRes } = valid._doc;
            res.cookie('token', token, { httpOnly: true }).status(200).json(outRes);
        }

    } catch (error) {
        next(error);
    }
}