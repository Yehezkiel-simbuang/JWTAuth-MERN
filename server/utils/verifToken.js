import { errorHandler } from "./errorHandler.js";
import jwt from 'jsonwebtoken';

export const verifToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next(errorHandler(401, "Token not found"));
    jwt.verify(token, process.env.JWT_PASS, (err, user) => {
        if (err) return next(errorHandler(401, "Token Invalid"));
        req.user = user;
        next();
    })
}