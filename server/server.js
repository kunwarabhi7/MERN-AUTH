import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './utils/db.js';
import { authRouter } from './routes/user.route.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';



dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8888;

app.use('/api/users',authRouter);
app.use(notFound);
app.use(errorHandler);


app.get("/", (req, res) =>     res.send("Welcome to the Express.js API!"))

app.listen(PORT, async() => {
  await  connectToDB();
    console.log(`Server is running on port ${PORT}`);
})