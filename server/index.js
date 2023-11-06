import express from 'express';
import mongoDB from 'mongoose';
import userRouter from './Routes/User.js';
import dotenv from 'dotenv';
import authRouter from './Routes/Auth.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoDB.connect(process.env.MONGOURI).
    then(() => {
        console.log("Connect to MongoDB")
    }).catch((err) => {
        console.log(err)
    });

const __dirname = path.resolve();
const app = express();
app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "index.html"));
// })

app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log("Connecting to port 3000....")
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
