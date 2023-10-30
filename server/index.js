import express from 'express';
import mongoDB from 'mongoose';
import userRouter from './Routes/User.js';
import dotenv from 'dotenv';
import authRouter from './Routes/Auth.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoDB.connect(process.env.MONGOURI).
    then(() => {
        console.log("Connect to MongoDB")
    }).catch((err) => {
        console.log(err)
    });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log("Connecting to port 5000....")
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
