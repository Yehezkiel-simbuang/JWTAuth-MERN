import { userMiddleware } from '../Middleware/User.js';
import express from 'express';

const userRouter = express.Router();

userRouter.get("/", userMiddleware);

export default userRouter;