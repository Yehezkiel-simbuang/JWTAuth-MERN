import User from "../Models/User.js";
import bcryptjs from 'bcryptjs';

export const authMiddleware = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const encryptedPass = bcryptjs.hashSync(password, 10);
        const saveAuth = new User({ username, email, password: encryptedPass });
        await saveAuth.save();
        res.status(201).json({ Message: "User created" });
    } catch (error) {
        res.status(500).json({ Message: error.message, Status: "failed" });
    }
}