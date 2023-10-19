import { authMiddleware } from '../Middleware/Auth.js';
import express from 'express';

const authRouter = express.Router();

authRouter.post("/sign-up", authMiddleware);

export default authRouter;