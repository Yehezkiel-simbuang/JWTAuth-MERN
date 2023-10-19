import { signInMiddleware, signUpMiddleware } from '../Middleware/Auth.js';
import express from 'express';

const authRouter = express.Router();

authRouter.post("/sign-up", signUpMiddleware);
authRouter.post("/sign-in", signInMiddleware);

export default authRouter;