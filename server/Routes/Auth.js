import { signInMiddleware, signUpMiddleware, googleMiddleware } from '../Middleware/Auth.js';
import express from 'express';

const authRouter = express.Router();

authRouter.post("/sign-up", signUpMiddleware);
authRouter.post("/sign-in", signInMiddleware);
authRouter.post("/google", googleMiddleware);

export default authRouter;