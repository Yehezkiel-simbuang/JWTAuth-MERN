import { signInMiddleware, signUpMiddleware, googleMiddleware, signoutMiddleware, authenticate } from '../Middleware/Auth.js';
import express from 'express';

const authRouter = express.Router();

authRouter.post("/sign-up", signUpMiddleware);
authRouter.post("/sign-in", signInMiddleware);
authRouter.post("/google", googleMiddleware);
authRouter.get("/sign-out", signoutMiddleware);
authRouter.get("/authenticate", authenticate);

export default authRouter;