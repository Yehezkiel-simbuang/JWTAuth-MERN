import User from "../Models/User.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from 'bcryptjs';
export const userMiddleware = (req, res) => {
    res.status(200).json({
        message: "Success",
        status: 200
    })
};

export const updateMiddleware = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You have no right"));
    try {
        // if (req.body.username) {
        //     const validUsername = await User.findOne({ username: req.body.username });
        //     if (validUsername) {
        //         res.status(400).json({ status: false, message: "Username already exist" });
        //     }
        // }
        // if (req.body.email) {
        //     const validEmail = await User.findOne({ email: req.body.email });
        //     if (validEmail) {
        //         res.status(400).json({ status: false, message: "Email already exist" });
        //     }
        // }

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updated = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                photourl: req.body.photourl
            }
        }, { new: true })
        const { password, ...rest } = updated._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

