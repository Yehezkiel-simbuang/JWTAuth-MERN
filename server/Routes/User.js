import { updateMiddleware, userMiddleware } from '../Middleware/User.js';
import express from 'express';
import { verifToken } from '../utils/verifToken.js';

const userRouter = express.Router();

userRouter.get("/", userMiddleware);
userRouter.post("/update/:id", verifToken, updateMiddleware);
export default userRouter;