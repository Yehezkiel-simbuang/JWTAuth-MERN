import express from 'express';
import mongoDB from 'mongoose';
import userRouter from './Routes/User.js';
import dotenv from 'dotenv';
import authRouter from './Routes/Auth.js';
dotenv.config();

mongoDB.connect(process.env.MONGOURI).
    then(() => {
        console.log("Connect to MongoDB")
    }).catch((err) => {
        console.log(err)
    });

const app = express();
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
    console.log("Connecting to port 5000....")
});