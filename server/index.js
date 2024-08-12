import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './db/connectdb.js';
import { authRouter } from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World! I love nidhi ❤️');
});

app.use('/api/auth', authRouter);

app.listen(3000, () => {
    connectDB();
    console.log('Server started on port 3000');
});