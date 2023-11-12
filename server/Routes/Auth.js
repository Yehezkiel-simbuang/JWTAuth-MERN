import { signInMiddleware, signUpMiddleware, googleMiddleware, signoutMiddleware } from '../Middleware/Auth.js';
import express from 'express';

const authRouter = express.Router();

authRouter.post("/sign-up", signUpMiddleware);
authRouter.post("/sign-in", signInMiddleware);
authRouter.post("/google", googleMiddleware);
authRouter.get("/sign-out", signoutMiddleware);

export default authRouter;